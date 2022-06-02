import { React, useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './App.css';
import { Canvas } from '@react-three/fiber';
import Scene from './components/KeyboardScene/Scene';
import { OrbitControls } from '@react-three/drei';


function App() {

  /*
  const mountRef = useRef(null);

  useEffect(() => {

    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true } );

    renderer.setSize( window.innerWidth / 2, window.innerHeight /2);
    
    mountRef.current.appendChild( renderer.domElement );

    const loader = new GLTFLoader();
    // Load a glTF resource
    loader.load("/models/scene.gltf", function(gltf){
      //console.log(gltf);
      gltf.scene.scale.multiplyScalar( 25 );
      scene.add(gltf.scene);
      camera.position.z = 5;

      var animate = function () {
        requestAnimationFrame( animate );
        gltf.scene.rotation.x += 0.008;
        gltf.scene.rotation.y += 0.008;
        renderer.render( scene, camera );
      };
      animate();
    },// called while loading is progressing
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( error );
      }
    );

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  */
  return (
    <div className="App">
      <div className='app-home'>
        <div className='keyboard-canvas'>
          <Canvas>
            <ambientLight />
            <Suspense fallback={null}>
                <Scene />  
            </Suspense>
          </Canvas>
        </div>

      </div>

    </div>
  );
}

export default App;
