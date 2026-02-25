
import React from 'react';
import { Hero } from '../Components/Hero/Hero';
import { Popular } from '../Components/Popular/Popular';
import { NewCollections } from '../Components/NewCollections/NewCollections';
import { Offers } from '../Components/Offers/Offers';
import { NewsLetter } from '../Components/NewsLetter/NewsLetter';

export function Shop() {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="shop-page">
      <Hero />
      <div className="reveal"><Popular /></div>
      <div className="reveal"><Offers /></div>
      <div className="reveal"><NewCollections /></div>
      <div className="reveal"><NewsLetter /></div>
    </div>
  );
}
