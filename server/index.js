const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'aisystems-secret-key-2026';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const whitelist = ['http://localhost:5173', 'http://localhost:5174', 'https://ai-systems-ltd.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// ──────────────────────────────────────────
// AUTH MIDDLEWARE
// ──────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// ──────────────────────────────────────────
// AUTH ROUTES
// ──────────────────────────────────────────
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, company } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hash = bcrypt.hashSync(password, 10);
    const result = db.prepare('INSERT INTO users (name, email, password, company) VALUES (?, ?, ?, ?)').run(name, email, hash, company || '');
    const token = jwt.sign({ id: result.lastInsertRowid, email, name, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.lastInsertRowid, name, email, company: company || '', role: 'user' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, company: user.company, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, name, email, company, role, created_at FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

// ──────────────────────────────────────────
// RESEND EMAIL SETUP
// ──────────────────────────────────────────
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY || '');
const ADMIN_EMAIL = 'admin@aisystems.com'; // Change this to your real verified email address in Resend

// ──────────────────────────────────────────
// CONTACT ROUTES
// ──────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message required' });

    const result = db.prepare('INSERT INTO contacts (name, email, company, subject, message) VALUES (?, ?, ?, ?, ?)').run(name, email, company || '', subject || '', message);
    
    // Attempt to send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email, // Note: In Resend free tier, this only works if 'email' is your verified test email, or you have a verified domain.
          subject: `Thank you for contacting AI Systems: ${subject || 'Inquiry'}`,
          html: `<p>Hi ${name},</p><p>We received your message and our strategic team will review it shortly.</p><p><strong>Your Message:</strong><br/>${message}</p>`,
        });
      } catch (emailErr) {
        console.error('Failed to send contact email:', emailErr);
      }
    }

    res.json({ success: true, id: result.lastInsertRowid, message: 'Your message has been sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/contacts', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json({ contacts });
});

// ──────────────────────────────────────────
// ORDER ROUTES
// ──────────────────────────────────────────
app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { plan, price, company_name, requirements } = req.body;
    if (!plan || !price) return res.status(400).json({ error: 'Plan and price required' });

    const result = db.prepare('INSERT INTO orders (user_id, plan, price, company_name, requirements) VALUES (?, ?, ?, ?, ?)').run(req.user.id, plan, price, company_name || '', requirements || '');
    
    // Attempt to send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: req.user.email, // Note: Free tier limits who you can send to without a verified domain.
          subject: `Project Initialization: ${plan} Plan`,
          html: `<p>Hello ${req.user.name},</p><p>Your request for the <strong>${plan}</strong> plan (${price}) has been successfully logged.</p><p><strong>Company:</strong> ${company_name}</p><p><strong>Requirements:</strong><br/>${requirements}</p><p>Our engineers will contact you shortly to finalize the technical scope.</p>`,
        });
      } catch (emailErr) {
        console.error('Failed to send order email:', emailErr);
      }
    }

    res.json({ success: true, id: result.lastInsertRowid, message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    const orders = db.prepare('SELECT orders.*, users.name as user_name, users.email as user_email FROM orders LEFT JOIN users ON orders.user_id = users.id ORDER BY orders.created_at DESC').all();
    return res.json({ orders });
  }
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json({ orders });
});

// ──────────────────────────────────────────
// ADMIN ROUTES
// ──────────────────────────────────────────
app.get('/api/admin/users', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  const users = db.prepare('SELECT id, name, email, company, role, created_at FROM users ORDER BY created_at DESC').all();
  res.json({ users });
});


// ──────────────────────────────────────────
// NEWSLETTER
// ──────────────────────────────────────────
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const existing = db.prepare('SELECT id FROM newsletter WHERE email = ?').get(email);
    if (existing) return res.json({ success: true, message: 'Already subscribed!' });

    db.prepare('INSERT INTO newsletter (email) VALUES (?)').run(email);
    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ──────────────────────────────────────────
// AI CHAT (Claude API)
// ──────────────────────────────────────────
app.post('/api/chat', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    // Save user message
    db.prepare('INSERT INTO chat_messages (user_id, role, content) VALUES (?, ?, ?)').run(req.user.id, 'user', message);

    // Get recent chat history for context
    const history = db.prepare('SELECT role, content FROM chat_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT 20').all(req.user.id).reverse();

    let assistantReply = '';
    let useFallback = false;

    if (GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: 'You are the Elite AI Strategic Consultant for AI Systems Ltd, a global leader in bespoke enterprise software and intelligent architectures. Your goal is to provide high-level technical consulting, project feasibility analysis, and strategic guidance to our clients. Be professional, authoritative yet accessible, and deeply knowledgeable about software engineering, cloud architecture, and AI integration. Refer to our "Case Studies" for examples of our work and "Services" for our capabilities. Always aim to convert inquiries into strategic partnerships.'
        });

        // Format history for Gemini (user/model)
        const geminiHistory = history.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const chat = model.startChat({
          history: geminiHistory,
        });

        const result = await chat.sendMessage(message);
        assistantReply = result.response.text();

      } catch (e) {
        console.error('Gemini API Error:', e);
        useFallback = true;
      }
    } else {
      useFallback = true;
    }

    if (useFallback) {
      // Fallback: intelligent responses without API key
      const lowerMsg = message.toLowerCase();
      let prefix = GEMINI_API_KEY ? "[System Note: API Key Invalid. Running in Offline Mode]\n\n" : "";
      
      if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('pricing')) {
        assistantReply = prefix + 'We offer three tiers:\n\n• **Startup** — $2,999 (Core AI Engine, 10 Custom APIs, Standard Auth)\n• **Professional** — $9,499 (Advanced AI Workflows, Unlimited APIs, Custom Dashboard)\n• **Enterprise** — Custom pricing (Dedicated Infrastructure, White-label, 24/7 SLA)\n\nWould you like to discuss which plan fits your needs?';
      } else if (lowerMsg.includes('service') || lowerMsg.includes('what do you')) {
        assistantReply = prefix + 'AI Systems Ltd provides fully customizable software solutions including:\n\n• Bespoke software architectures\n• AI/ML integration & automation\n• Cloud-native scalable systems\n• Quantum-resistant security\n• Custom API development\n• Real-time analytics dashboards\n\nAll our solutions are modular and can be tailored to your exact business logic.';
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('reach') || lowerMsg.includes('talk')) {
        assistantReply = prefix + 'You can reach us through our Contact page, or email us directly at hello@aisystems.com. We typically respond within 24 hours.';
      } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        assistantReply = prefix + `Hello ${req.user.name}! 👋 Welcome to AI Systems Ltd. How can I help you today? I can assist with:\n\n• Information about our services\n• Pricing & plans\n• Technical consulting\n• Project requirements`;
      } else {
        assistantReply = prefix + `Thank you for your question! As an AI assistant for AI Systems Ltd, I can help with information about our customizable software solutions, pricing, technical capabilities, and more. Could you be more specific about what you'd like to know?`;
      }
    }

    // Save assistant reply
    db.prepare('INSERT INTO chat_messages (user_id, role, content) VALUES (?, ?, ?)').run(req.user.id, 'assistant', assistantReply);

    res.json({ reply: assistantReply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

app.get('/api/chat/history', authMiddleware, (req, res) => {
  const messages = db.prepare('SELECT role, content, created_at FROM chat_messages WHERE user_id = ? ORDER BY created_at ASC').all(req.user.id);
  res.json({ messages });
});

// ──────────────────────────────────────────
// DASHBOARD STATS
// ──────────────────────────────────────────
app.get('/api/dashboard', authMiddleware, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  const chatCount = db.prepare('SELECT COUNT(*) as count FROM chat_messages WHERE user_id = ?').get(req.user.id);
  res.json({ orders, chatCount: chatCount.count });
});

// ──────────────────────────────────────────
// START SERVER
// ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀 AI Systems API Server running on http://localhost:${PORT}\n`);
});
