import React from 'react';
import { Form, Select } from 'antd';
import { categories } from '../../data/categories';
import styles from './categorySelect.module.scss';

const { Option, OptGroup } = Select;

const CategorySelect: React.FC = () => (
  <>
    <Form.Item 
      name="category" 
      label={<span>Категория<span style={{ color: "red" }}>*</span></span>}
      rules={[{ message: "Пожалуйста, выберите категорию", required: true }]}
    >
      <Select placeholder="Выберите категорию" className={styles.categorySelect} dropdownClassName={styles.categoryDropdown}>
        {categories.map(cat => cat.children ? (
          <OptGroup key={cat.value} label={cat.label} className={styles.categoryOption}>
            {cat.children.map(child => (
              <Option key={child.value} value={child.value} className={styles.categoryOption}>
                {child.label}
              </Option>
            ))}
          </OptGroup>
        ) : (
          <Option key={cat.value} value={cat.value} className={styles.categoryOption}>
            {cat.label}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item 
      name="additionalCategory" 
      label="Дополнительная категория"
    >
      <Select placeholder="Выберите дополнительную категорию" className={styles.additionalCategorySelect} dropdownClassName={styles.categoryDropdown}>
        {categories.map(cat => cat.children ? (
          <OptGroup key={cat.value} label={cat.label} className={styles.categoryOption}>
            {cat.children.map(child => (
              <Option key={child.value} value={child.value} className={styles.categoryOption}>
                {child.label}
              </Option>
            ))}
          </OptGroup>
        ) : (
          <Option key={cat.value} value={cat.value} className={styles.categoryOption}>
            {cat.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </>
);

export default CategorySelect;
