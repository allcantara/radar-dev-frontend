import React, { useState, useEffect } from 'react';

import './DevFormStyle.css';

export default ({ onSubmit }) => {
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');



  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(String(latitude));
        setLongitude(String(longitude));
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);




  const handleSubmit = async (event) => {
    event.preventDefault();
    let lat = latitude;
    let long = longitude;
    await onSubmit({
      github_username,
      techs,
      latitude: lat,
      longitude: long,
    });

    setGithub_username('');
    setTechs('');
    setLatitude('');
    setLongitude('');
  }



  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          id="github_username"
          name="github_username"
          type="text"
          required
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          id="techs"
          name="techs"
          type="text"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input 
            id="latitude" 
            name="latitude" 
            type="number" 
            required 
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            name="longitude"
            type="number"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
}


