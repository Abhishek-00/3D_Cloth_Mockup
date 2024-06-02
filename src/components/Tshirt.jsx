/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/printable tshirt.glb -o src/components/Tshirt.jsx -r public 
*/

import React, { useRef, useState } from 'react'
import { useGLTF, Decal, useTexture } from '@react-three/drei'
import { useControls } from 'leva'


export function Tshirt(props) {

  const { nodes, materials } = useGLTF('/models/printable hoodie black.glb')
  const decal = useRef()


  const [pos, setPos] = useState([0, 4.25, 1.34])
  const [rotation, setRotation] = useState([0, 0, 0])
  const [scale, setScale] = useState([1.5, 1.5, 1.5])

  useControls({
    angle_x: {
      min: 0,
      max: Math.PI * 2,
      value: 0,
      step: 0.01,
      onChange: (value) => {
        setRotation((rot) => [value, rotation[1], rotation[2]])
      }
    },
    angle_y: {
      min: 0,
      max: Math.PI * 2,
      value: 0,
      step: 0.01,
      onChange: (value) => {
        setRotation((rot) => [rotation[0], value, rotation[2]])
      }
    },
    angle_z: {
      min: 0,
      max: Math.PI * 2,
      value: 0,
      step: 0.01,
      onChange: (value) => {
        setRotation((rot) => [rotation[0], rotation[1], value])
      }
    },
    position_x: {
      min: -5,
      max: 5,
      value: 0,
      step: 0.001,
      onChange: (value) => {
        setPos((pos) => [value, pos[1], pos[2]]);
      }
    },
    position_y: {
      min: -2,
      max: 10,
      value: 4.25,
      step: 0.001,
      onChange: (value) => {
        setPos((pos) => [pos[0], value, pos[2]]);
      }
    },
    position_z: {
      min: -5,
      max: 5,
      value: 1.34,
      step: 0.001,
      onChange: (value) => {
        setPos((pos) => [pos[0], pos[1], value]);
      }
    },
    scale_x_y: {
      min: 0,
      max: 5,
      value: 1.5,
      step: 0.001,
      onChange: (value) => {
        setScale((scl) => [value, value, scl[2]]);
      }
    },
    scale_z: {
      min: 0,
      max: 5,
      value: 1.5,
      step: 0.001,
      onChange: (value) => {
        setScale((scl) => [scl[0], scl[1], value]);
      }
    },
  })


  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.Shirt} />
      <mesh geometry={nodes.Object_1.geometry} material={materials.Shirt} />
      <mesh
        geometry={nodes.Object_1_1.geometry}
        material={materials['01__Default']}
        
      >
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          ref={decal}
          debug // Makes "bounding box" of the decal visible
          position={pos} // Position of the decal
          rotation={rotation} // Rotation of the decal (can be a vector or a degree in radians)
          scale={scale} // Scale of the decal

        >
          <meshBasicMaterial
            map={texture}
            transparent
            polygonOffset
            polygonOffsetFactor={-4} // The material should take precedence over the original
          />
        </Decal>
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/printable tshirt.glb')