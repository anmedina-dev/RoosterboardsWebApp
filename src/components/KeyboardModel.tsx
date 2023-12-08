import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
  };
  materials: {
    KeyBoard_01: THREE.MeshStandardMaterial;
  };
};

export default function KeyboardModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/assets/gltf/keyboard.gltf"
  ) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / -0.5, 0.5, 0.4]} scale={3}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.defaultMaterial.geometry}
          material={materials.KeyBoard_01}
          rotation={[Math.PI / -2, -2, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/gltf/keyboard.gltf");
