import React from 'react';
import Navigacija from '../komponente/Navigacija';
import Dugme from '../komponente/Dugme';
import Naslov from '../komponente/Naslov';
import '../css/Pocetna.css';

export default function Pocetna() {
  return (
    <div
      className="pocetna-background"
      style={{
        background: `url(${process.env.PUBLIC_URL + "/img/pozadina.png"}) center center / cover no-repeat`
      }}
    >
      <Navigacija />
      <header className="pocetna-header">
        <img src="/img/logo.igrica.png" alt="Logo igre" className="pocetna-logo" />

        <Naslov 
          title="Dobrodošli u memorijsku igricu!" 
          subtitle="Testirajte svoje pamćenje i zabavite se sa prijateljem!" 
        />

        <div style={{ marginTop: "20px" }}>
          <Dugme text="Započni igru" to="/igra" />
        </div>
      </header>
    </div>
  );
}
