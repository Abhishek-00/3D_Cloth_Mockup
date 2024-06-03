import React, { useState } from 'react'
import { useGLTF, useTexture, Decal, PresentationControls, } from '@react-three/drei'
import { useControls } from 'leva'
import { useSelector } from "react-redux";
import { getImageSelector } from '../redux/slices/imageUploadSlice';

export function Hoodie(props) {
    const { nodes, materials } = useGLTF('/models/printable hoodie black.glb')

    return (
        <>
            <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-2, 1.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 200 }}
            >
                <group
                    castShadow
                    receiveShadow
                    {...props}
                    dispose={null}
                >
                    <mesh
                        geometry={nodes.Object_4.geometry}
                        material={materials['Material.001']}
                        position={[-0.01, 1.945, 0.065]}
                        rotation={[1.595, -0.05, 0.012]}
                        scale={0.055}
                    />
                    <group position={[-0.01, 1.945, 0.065]} rotation={[1.595, -0.05, 0.012]} scale={0.055}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Object_1.geometry}
                            material={materials['Material.001']}
                        />

                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Object_1_2.geometry}
                            material={materials['pirntable 2']}
                        />

                        <PrintableMaterialFront />


                    </group>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_6.geometry}
                        material={materials['Material.001']}
                        position={[-0.01, 1.945, 0.065]}
                        rotation={[1.595, -0.05, 0.012]}
                        scale={0.055}
                    />

                </group>
            </PresentationControls>
        </>
    )
}



const PrintableMaterialFront = () => {
    const { nodes, materials } = useGLTF('/models/printable hoodie black.glb');

    const uploadedImage = useSelector(getImageSelector)
    const { image, height, width } = useSelector(getImageSelector)
    const texture = useTexture(image)
    // console.log("image ", uploadedImage);

    const [pos, setPos] = useState([9.21, 16.97, -12.34])
    const [rotation, setRotation] = useState([4.69, 0, 0])



    const { scale } = useControls('Image Transformation', ({
        Rotate: {
            min: 0,
            max: Math.PI * 2,
            value: 0,
            step: 0.01,
            onChange: (value) => {
                setRotation((rot) => [rotation[0], rotation[1], value])
            }
        },
        'X-axis': {
            min: -30,
            max: 30,
            value: 9.21,
            step: 0.001,
            onChange: (value) => {
                setPos((pos) => [value, pos[1], pos[2]]);
            }
        },
        'Y-axis': {
            min: -30,
            max: 30,
            value: -12.34,
            step: 0.001,
            onChange: (value) => {
                setPos((pos) => [pos[0], pos[1], value]);
            }
        },
        scale: {
            min: 0,
            max: 8,
            value: 1,
            step: 0.00001,
        },
    }))


    return (
        <>
            <mesh
                geometry={nodes.Object_1_1.geometry}
                material={materials['01__Default']}
            >
                <meshBasicMaterial transparent opacity={0} />
                <Decal
                    position={pos} // Position of the decal
                    rotation={rotation} // Rotation of the decal (can be a vector or a degree in radians)
                    scale={[(width / 100) * scale, (height / 100) * scale, 38.92]} // Scale of the decal
                >
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        polygonOffset
                        polygonOffsetFactor={-4} // The material should take precedence over the original
                    />

                </Decal>
            </mesh>
        </>
    )
}


useGLTF.preload('/models/printable hoodie black.glb')
