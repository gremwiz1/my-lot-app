import React from 'react';
import LotForm from '../components/lotForm';
import LotList from '../components/lotList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Создание нового лота</h1>
      <LotForm />
      <h2>Список лотов</h2>
      <LotList />
    </div>
  );
};

export default Home;
