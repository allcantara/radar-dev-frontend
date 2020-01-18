import React, { useState, useEffect } from 'react';
import DevItem from './components/DevItem/DevItem';
import FormDev from './components/DevForm/DevForm';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    const loadDevs = async () => {
      try {
        const response = await api.get('/devs');
        setDevs(response.data);
      } catch(e) {
        console.log(e);
      }
    }

    loadDevs();
  }, [])



  const handleAddDev = async (data) => {
    try {
      const response = await api.post('/devs', data);
      setDevs([ ...devs, response.data ]);
    } catch(e) {
      console.log(e);
    }
  }



  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <FormDev onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map((dev, i) => 
            <DevItem key={i} dev={dev} />
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
