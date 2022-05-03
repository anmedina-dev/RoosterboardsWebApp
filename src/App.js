import { React, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './App.css';

function App() {

  const mountRef = useRef(null);

  useEffect(() => {

    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true } );

    renderer.setSize( window.innerWidth, window.innerHeight );
    
    mountRef.current.appendChild( renderer.domElement );

    const loader = new GLTFLoader();
    // Load a glTF resource
    loader.load("/models/scene.gltf", function(gltf){
      //console.log(gltf);
      gltf.scene.scale.multiplyScalar( 14 );
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
    /*
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    
    //scene.add( cube );
    camera.position.z = 5;
    
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    
    animate();
*/
    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div ref={mountRef}> </div>
      </header>
    </div>
  );
}

export default App;
