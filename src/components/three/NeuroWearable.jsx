import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const NeuroWearable = () => {
  const groupRef = useRef();
  const innerRingRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main device body - Sleek, thick black ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.2, 0.5, 64, 128]} />
        <meshStandardMaterial
          color="#000000"
          roughness={0.05}
          metalness={1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Primary Glowing Ring behind/inside */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]} position={[0, 0, -0.1]}>
        <torusGeometry args={[2.3, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#84FF00"
          emissive="#84FF00"
          emissiveIntensity={15}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Floating Intelligence Nodes */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[2.8, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#84FF00" emissive="#84FF00" emissiveIntensity={5} />
          </mesh>
        </group>
      ))}

      {/* Core "Lens" detail */}
      <mesh position={[0, 0, 2.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 64]} />
        <meshStandardMaterial color="#050505" roughness={0} metalness={1} />
        <mesh position={[0, 0.11, 0]}>
          <circleGeometry args={[0.4, 64]} />
          <meshStandardMaterial color="#84FF00" emissive="#84FF00" emissiveIntensity={2} transparent opacity={0.3} />
        </mesh>
      </mesh>

      {/* Particle field matching the wave in the image */}
      <Sparkles count={100} scale={6} size={1.5} speed={0.2} color="#84FF00" opacity={0.3} />

      <ContactShadows
        position={[0, -4, 0]}
        opacity={0.6}
        scale={12}
        blur={2}
        far={4}
      />
    </group>
  );
};

export default NeuroWearable;
