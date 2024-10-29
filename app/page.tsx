import React from 'react';
import LotList from './components/lotList';
import LotForm from './components/lotForm';
import Footer from './components/footer';

export default function Home() {
  return (
    <div>
      <LotForm />
      <LotList />
      <Footer />
    </div>
  );
}
