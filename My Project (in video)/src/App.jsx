import React, { Suspense } from 'react';
import { Scene } from './Scene';
import { UI } from './UI';

function App() {
  return (
    <div className="w-full h-full bg-black">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <UI />
    </div>
  );
}

export default App;