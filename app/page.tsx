import React from 'react';
import LotList from './components/lotList';
import LotForm from './components/lotForm';

export default function Home() {
  return (
    <div>
      <LotForm />
      <LotList />
    </div>
  );
}
