import React from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

const App: React.FC = () => {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Excalidraw
        initialData={{
          appState: {
            viewBackgroundColor: '#ffffff',
          },
        }}
        theme="light"
      />
    </div>
  );
};

export default App; 