import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global'

function App() {
  return (
    <>
    <GlobalStyle/>
    <div className="App">
       <Routes/>
    </div>
    </>
  );
}

export default App;
