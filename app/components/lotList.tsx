'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeLot } from '../store/lotSlice';
import { Button, List } from 'antd';

const LotList: React.FC = () => {
  const dispatch = useDispatch();
  const lots = useSelector((state: RootState) => state.lot.lots);

  return (
    <List
      dataSource={lots}
      renderItem={lot => (
        <List.Item
          key={lot.id}
          actions={[
            <Button key={`remove-${lot.id}`} onClick={() => dispatch(removeLot(lot.id))}>
              Удалить
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={lot.name}
            description={`Категория: ${lot.category} | Производитель: ${lot.manufacturer}`}
          />
        </List.Item>
      )}
    />
  );
};

export default LotList;
