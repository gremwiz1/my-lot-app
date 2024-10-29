'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { removeLot } from '../../store/lotSlice';
import { Button, Table, Space, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Lot {
  id: string;
  name: string;
  category: string;
  condition: string;
  manufacturer: string;
  scale: string;
  material: string;
  description: string;
  createdAt: string;
  type: 'announcement' | 'auction';
}

const LotList: React.FC<{ onAddNewLot: () => void }> = ({ onAddNewLot }) => {
  const dispatch = useDispatch();
  const lots = useSelector((state: RootState) => state.lot.lots);

  const columns: ColumnsType<Lot> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: 'Производитель',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Аукцион', value: 'auction' },
        { text: 'Объявление', value: 'announcement' },
      ],
      onFilter: (value, record) => record.type === value,
      sorter: (a, b) => a.type.localeCompare(b.type),
      render: (text) => (text === 'auction' ? 'Аукцион' : 'Объявление'),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Вы уверены, что хотите удалить этот лот?"
            onConfirm={() => dispatch(removeLot(record.id))}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="link">Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', padding: '16px' }}>
        <Button type="primary" onClick={onAddNewLot}>
          Добавить новый лот
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={lots}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default LotList;
