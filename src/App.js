import React, { useState } from 'react';
import Header from './components/Header'
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
    const [text, setText] = useState('');

    const handleResults = (results) => {
      setText(results);
  };

  return (
    <div className="App">
    
      <Header />
      <Main />
      <Footer />
  </div>
  )
}

export default App;

