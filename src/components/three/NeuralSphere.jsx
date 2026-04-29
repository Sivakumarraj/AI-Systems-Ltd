import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

const NeuralSphere = () => {
  const sphereRef = useRef();
  const innerSphereRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    sphereRef.current.rotation.y = time * 0.2;
    sphereRef.current.rotation.z = time * 0.1;
    innerSphereRef.current.rotation.y = -time * 0.4;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Distorted Sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#7fff00" // Neon primary
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#7fff00"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner Core */}
        <mesh ref={innerSphereRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshWobbleMaterial
            color="#ff4500" // Neon secondary
            speed={4}
            factor={0.6}
            emissive="#ff4500"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Particles / Neural Network Effect */}
        <Points />
      </Float>
    </group>
  );
};

const Points = () => {
  const pointsRef = useRef();
  
  const particlesCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#7fff00"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

export default NeuralSphere;
