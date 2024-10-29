import React from 'react';
import { Radio } from 'antd';
import styles from './publicationTypeSelect.module.scss';

interface PublicationTypeSelectProps {
  publicationType: string;
  onChange: (value: string) => void;
}

const PublicationTypeSelect: React.FC<PublicationTypeSelectProps> = ({ publicationType, onChange }) => (
  <Radio.Group value={publicationType} onChange={(e) => onChange(e.target.value)} className={styles.radioButtons}>
    <Radio.Button value="auction" className={`${styles.radioButton} ${styles.sizeAuction} ${publicationType === "auction" ? styles.active : ""}`}>
      Аукцион
    </Radio.Button>
    <Radio.Button value="announcement" className={`${styles.radioButton} ${styles.sizeAnnouncement} ${publicationType === "announcement" ? styles.active : ""}`}>
      Объявление
    </Radio.Button>
  </Radio.Group>
);

export default PublicationTypeSelect;
