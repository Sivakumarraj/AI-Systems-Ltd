import React, { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, MeshDistortMaterial, PresentationControls, Float, ContactShadows } from "@react-three/drei";

const DemoModel = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time / 4);
      meshRef.current.rotation.y = Math.sin(time / 2);
    }
  });

  return (
    <PresentationControls
      global
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 1500 }}
      rotation={[0, 0.3, 0]}
      polar={[-Math.PI / 3, Math.PI / 3]}
      azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
    >
      <Float rotationIntensity={1.5} floatIntensity={2} speed={3}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.35, 256, 32]} />
          <MeshDistortMaterial
            color="#ffffff"
            speed={2}
            distort={0.4}
            metalness={1}
            roughness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4.5}
      />
    </PresentationControls>
  );
};

const Demo = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="demo" ref={containerRef} className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20 pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div style={{ opacity, scale }}>
            <span className="label text-primary mb-4 block">Interactive Experience</span>
            <h2 className="section-title text-white mb-6">Experience the Core</h2>
            <p className="body-text max-w-2xl mx-auto">
              Interact with the AI Engine. Grab and rotate the core architecture to visualize how our modular components fit together seamlessly.
            </p>
          </motion.div>
        </div>

        <div className="h-[600px] w-full rounded-[40px] border border-white/10 bg-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            <pointLight position={[-10, -10, -10]} color="#7fff00" intensity={1} />
            <Suspense fallback={null}>
              <DemoModel />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 w-full">
            <div className="flex flex-col items-center gap-4 pointer-events-none">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
                <div className="w-1 h-3 bg-white/40 rounded-full" />
              </div>
              <span className="label text-white/50">Drag to Explore</span>
            </div>
            
            <button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 rounded-full bg-white/10 text-white font-bold backdrop-blur-md border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all pointer-events-auto"
            >
              Talk to a Strategic Consultant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
