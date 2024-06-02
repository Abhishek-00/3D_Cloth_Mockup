import React, { useRef, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Loader, useProgress } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Leva } from 'leva';
import { useDispatch } from 'react-redux';
import { setImage } from "./redux/slices/imageUploadSlice";


function App() {

  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  const [previousPreview, setPreviousPreview] = useState(null);

  // const { focalDistance, focalLength, bokehScale, Height } = useControls({
  //   focalDistance: {
  //     min: 0,
  //     max: 1,
  //     value: 0
  //   },
  //   focalLength: {
  //     min: 0,
  //     max: 2,
  //     value: 0.2
  //   },
  //   bokehScale: {
  //     min: 0,
  //     max: 10,
  //     value: 4.2
  //   },
  //   Height: {
  //     min: 0,
  //     max: 1024,
  //     value: 480
  //   },
  // })

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/svg+xml') {
      const previewUrl = URL.createObjectURL(file);

      // Load the image to get its dimensions
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        console.log('Image uploaded & set height, width', width, height);

        // Revoke previous preview URL to clean up memory
        if (previousPreview) {
          URL.revokeObjectURL(previousPreview);
        }

        setPreviousPreview(previewUrl);
        // dispatch(setImage(previewUrl, true, width, height));
        dispatch(setImage({
          image: previewUrl,
          preview: true,
          width: width,
          height: height
        }));
      };
      img.src = previewUrl;
    } else {
      alert('Please select a PNG, JPG, or SVG image.');
    }
  };




  return (
    <>
      <div className="wrapper">
        <div>
          <Canvas
            // gl={{ preserveDrawingBuffer: true }}
            // dpr={1.5}
            id="canvas"
            // ref={canvasRef}
            shadows
            camera={{
              fov: 45,
              position: [0, 0.6, 1.2],
              near: 0.1,
              far: 2000,
            }}>
            {/* <color attach="background" args={["#f1b8fb"]} /> */}
            <Suspense fallback={null}>
              <Experience />

              {/* <EffectComposer>
            <DepthOfField
              focusDistance={focalDistance}
              focalLength={focalLength}
              bokehScale={bokehScale}
              height={Height}
            />
            <Bloom
              mipmapBlur
              luminanceThreshold={1}
              intensity={2.4}
            />
            <Vignette
              offset={0.4}
              darkness={0.7}
            />
          </EffectComposer> */}
            </Suspense>
          </Canvas>
          <Loader />
        </div>
        <div className="container">


          <label htmlFor="file-upload" className="custum-file-upload">
            <div className="icon">
              <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g>
              </svg>
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleImageChange}
              className="input"
              id="file-upload"
            />
            <div className="text">
              <span>Click to upload Your image</span>
            </div>

          </label>
        </div>
        <Leva collapsed />


      </div>
    </>
  );
}






export default App;
