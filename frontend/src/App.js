import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Django Pro Frontend</h1>
        <p>Welcome to your Django + React application!</p>
      </header>
      <main className="app-main">
        <MyComponent />
      </main>
    </div>
  );
}

function MyComponent(props) {
  return (
    <div className="my-component">
      <h2>My Component</h2>
      <p>This is your custom component. You can modify it as needed.</p>
    </div>
  );
}

export default App;
