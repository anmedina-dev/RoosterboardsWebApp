import { React, Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import Scene from './components/KeyboardScene/Scene';

function App() {

  return (
    <div className="App">
      <div className='app-home'>
        <div className='app-header'>
          <h1>Roosterboards Company</h1>
          <h4>Original Keyboards, Switches, Keycaps, etc.</h4>
        </div>
        <div className='keyboard-canvas'>
          <Canvas>
            <ambientLight intensity={1} />
            <pointLight color="white" intensity={1} position={[10, 10, 10]}  />
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
