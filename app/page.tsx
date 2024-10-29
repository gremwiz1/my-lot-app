'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import LotList from './components/lotList/lotList';
import LotForm from './components/lotForm/lotForm';

const Footer = dynamic(() => import('./components/footer/footer'), { ssr: false });

export default function Home() {
  const [currentPage, setCurrentPage] = useState('LotForm');

  const goToLotList = () => setCurrentPage('LotList');
  const goToLotForm = () => setCurrentPage('LotForm');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {currentPage === 'LotForm' ? (
        <LotForm onCreateLot={goToLotList} />
      ) : (
        <LotList onAddNewLot={goToLotForm} />
      )}
      <Footer />
    </div>
  );
}
