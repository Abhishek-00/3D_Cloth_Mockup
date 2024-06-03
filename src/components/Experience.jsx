import { useRef, useState, useMemo, useEffect } from "react";
import {  Environment, Sparkles, ContactShadows, Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Hoodie } from "./Hoodie";
import { useControls, button } from "leva";
// import { LayerMaterial, Depth } from 'lamina'
// import { useFrame } from "@react-three/fiber";
// import { Color } from "lamina/vanilla";



// const BG_SPEED = 0.3

export const Experience = () => {
  const [position, setPosition] = useState([- 0.1, -0.1, 0.1])


  const { gl, camera, scene } = useThree()
  const cameraRef = useRef(camera);

  const download = () => {

    return new Promise((resolve) => {
      try {
        // Render the scene
        gl.render(scene, camera);
        // console.log(camera.position);

        // Create a download link
        const link = document.createElement('a');
        link.setAttribute('download', 'tshirt.png');
        link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'));

        // Simulate click to start download
        link.click();

        // Resolve the promise after download
        resolve();
      } catch (error) {
        // Reject the promise if there's an error
        reject(error);
      }
    })
  }

  const downloadOptions = useControls('Download Options',
    {
      Background: false,
      'Download Image': button(async () => {
        try {
          await download();

        } catch (error) {
          alert("Screenshot download failed:");
          console.error("Screenshot download failed:", error);
        }
      }),
    },
    {
      collapsed: true
    }
  )



  const values = useControls('Background',
    {
      color: '#2d4967',
      Sparkles: true
    },
    {
      collapsed: true
    }
  );

  // Memoize the color value
  const _color = useMemo(() => {
    if (typeof values.color !== 'string') {
      let c = values.color;

      if ('a' in c) return `rgba(${c.r * 255}, ${c.g * 255}, ${c.b * 255}, ${c.a})`; // Convert to 0-255 range
      return `rgb(${c.r * 255}, ${c.g * 255}, ${c.b * 255})`; // Convert to 0-255 range
    }

    return values.color;
  }, [values.color]);

  if (downloadOptions.Background) {
    const canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = _color;
  } else {
    const canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = 'transparent'
  }

  // Apply the background color to the body
  useEffect(() => {
    document.body.style.backgroundColor = _color;

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [_color, downloadOptions.Background]);



  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 576) {
        setPosition([0, -0.2, -0.4]); // Position for small screens
        cameraRef.current.fov = 50; // Update the FOV
        cameraRef.current.updateProjectionMatrix(); // Apply the change
        // alert(camera.fov)
      }
    };

    updatePosition(); // Check initial window size

    window.addEventListener('resize', updatePosition); // Add resize listener

    return () => {
      window.removeEventListener('resize', updatePosition); // Cleanup on unmount
    };
  }, []);

  return (
    <>




      <Float rotationIntensity={0.1} floatingRange={[-0.06, 0.05]} position={position} rotation-x={-Math.PI / 10}>

        <Hoodie
          // rotation-x={-Math.PI / 10}
          // position={[-0.2, -0.2, 0]}
          scale={[0.1, 0.1, 0.1]}
        />

      </Float>








      <ambientLight intensity={1.5} />
      <spotLight debug position={[1, 4, 2]} intensity={2} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />

      {/* <ambientLight intensity={0.3} /> */}
      {/* <directionalLight
        position={[4, 5, 5]}
        intensity={0.8}
        color={'#f0f8ff'}
      />
      <directionalLight
        position={[4, 5, -5]}
        intensity={0.8}
        color={'#ec83fe'}
      /> */}

      {
        values.Sparkles && (
          <Sparkles
            count={25}
            scale={1.4}
            size={0.5}
            speed={0.2}
            color={'#ec83fe'}
            position={[- 0.2, 0, 0.01]}
          />
        )
      }




      <spotLight
        position={[2, 3, 4]}
        intensity={1}
        angle={0.3}
        penumbra={0.4}
      />

      {/* <mesh
        receiveShadow={false}
        castShadow={false}
        ref={ref}>
        <sphereGeometry args={[2, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Depth
            colorA="#f21a62" //
            colorB="#0081fc"
            alpha={0.89}
            mode="normal"
            near={0}
            far={6}
            origin={[1, 1, 1]}
          />
          <Noise
            mapping='local'
            type='white'
            scale={100}
            colorA={'white'}
            colorB={'black'}
            mode={'subtract'}
            alpha={0.42}
          />
        </LayerMaterial>
      </mesh> */}
      <ContactShadows position={[0, - 0.4, 0]} opacity={0.4} scale={4} blur={1.5} far={4} />

      {
        downloadOptions.Background && (
          <color attach="background" args={[_color]} />
        )
      }

      <Environment preset="city" />
    </>
  );
};
