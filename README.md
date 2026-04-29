# AI Systems Ltd: Enterprise AI Consulting Platform

![AI Systems Ltd](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-MERN(SQLite)-blue)
![AI Powered](https://img.shields.io/badge/AI-Google_Gemini-orange)

A premium, full-stack enterprise web application designed for a high-end software consulting agency. This platform bridges the gap between a promotional landing page and a fully functional SaaS client portal. It features a state-of-the-art 3D interactive UI, secure user authentication, an order management system, and an integrated AI Strategic Consultant powered by Google Gemini.

## ✨ Core Features

*   **Interactive 3D UI**: Built with React Three Fiber, featuring a high-gloss, physics-based `NeuroWearable` 3D element and premium Framer Motion page transitions.
*   **The Executive Dashboard**: A secure client portal where authenticated users can track their infrastructure orders and chat with the AI.
*   **AI Strategic Consultant**: Directly integrated with the **Google Gemini API** (`gemini-1.5-flash`), providing intelligent, context-aware consulting to prospective clients. Includes robust offline fallback logic.
*   **Secure Authentication**: Custom JWT (JSON Web Token) implementation with `bcryptjs` password hashing and Role-Based Access Control (RBAC).
*   **Admin Terminal**: A dedicated, role-protected interface for administrators to view registered users, track sales pipelines, and read contact inquiries.
*   **Automated Email Notifications**: Integrated with the **Resend API** to automatically trigger email receipts when new orders are initialized.
*   **Zero-Config Database**: Utilizes `better-sqlite3` operating in WAL mode for blazing-fast, localized relational data storage without the overhead of external database servers.

## 🛠️ Technology Stack

**Frontend Architecture:**
*   React 18 + Vite
*   Tailwind CSS (Custom Utility Classes & Premium Radii)
*   Framer Motion (Micro-animations)
*   React Three Fiber & Drei (WebGL 3D Rendering)
*   Zustand / React Context (State Management)

**Backend Architecture:**
*   Node.js + Express.js
*   SQLite3 (Relational Database)
*   Google Generative AI SDK (`@google/generative-ai`)
*   Resend Node SDK
*   JSON Web Tokens (JWT)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   A [Google AI Studio](https://aistudio.google.com/) API Key.
*   A [Resend](https://resend.com/) API Key (Optional for emails).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-systems-ltd.git
   cd ai-systems-ltd
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # AI Systems Environment Variables
   GEMINI_API_KEY=your_google_gemini_key_here
   JWT_SECRET=your_ultra_secure_jwt_secret_here
   PORT=3001
   RESEND_API_KEY=your_resend_api_key_here
   ```

### Running the Application (Development Mode)

You need to run both the frontend and backend servers concurrently.

**Terminal 1 (Frontend):**
```bash
# From the root directory
npm run dev
# Starts Vite server on http://localhost:5174
```

**Terminal 2 (Backend):**
```bash
cd server
node index.js
# Starts Express server on http://localhost:3001
```

## 🔐 Default Admin Access
Upon first boot, the system automatically seeds a master admin account into the SQLite database for testing purposes.
*   **URL:** `http://localhost:5174/login`
*   **Email:** `admin@aisystems.com`
*   **Password:** `admin123`

## 🔮 Future Architecture Roadmap (V2)
Included in the repository is a `docker-compose.yml` and a structural blueprint for scaling to massive enterprise traffic. The V2 roadmap includes migrating from SQLite to **PostgreSQL** with **Prisma ORM**, integrating **Redis** for rate-limiting, and implementing `pgvector` for advanced AI memory.

---
*Engineered for impact.*
