"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLot } from "../store/lotSlice";
import { Button, Form, Input, Select, Card, Radio } from "antd";
import styles from "./lotForm.module.scss";

const { Option, OptGroup } = Select;

const categories = [
  {
    label: "Масштабные модели",
    value: "scale-models",
    children: [
      { label: "Автомобили", value: "cars" },
      { label: "Корабли", value: "ships" },
    ],
  },
  {
    label: "Отечественные автомобили",
    value: "domestic-cars",
    children: null,
  },
  {
    label: "Тракторы, строительная техника",
    value: "tractors-construction",
    children: [
      { label: "Экскаваторы", value: "excavators" },
      { label: "Погрузчики", value: "loaders" },
    ],
  },
];

const LotForm: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [condition, setCondition] = useState("new");
  const [publicationType, setPublicationType] = useState("announcement");

  const handleSubmit = (values: any) => {
    dispatch(addLot(values));
    form.resetFields();
  };

  const labelRef = React.useRef<HTMLDivElement>(null);
  const charCounterRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (labelRef.current && labelRef.current.parentElement) {
      const parent = labelRef.current.parentElement;
      parent.style.display = "flex";
    }
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <Card bordered={false} style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 className={styles.headerTitle}>Создание лота</h2>

        {/* Тип публикации */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <div className={styles.formElement}>
            <h3 className={styles.headerSubtitle}>Тип публикации</h3>
            <Form.Item>
              <Radio.Group
                value={publicationType}
                onChange={(e) => setPublicationType(e.target.value)}
                className={styles.radioButtons}
              >
                <Radio.Button
                  value="auction"
                  className={`${styles.radioButton} ${styles.sizeAuction} ${
                    publicationType === "auction" ? styles.active : ""
                  }`}
                >
                  Аукцион
                </Radio.Button>
                <Radio.Button
                  value="announcement"
                  className={`${styles.radioButton} ${
                    styles.sizeAnnouncement
                  } ${publicationType === "announcement" ? styles.active : ""}`}
                >
                  Объявление
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Категории */}
          <div className={styles.formElement}>
            <h3 className={styles.headerSubtitle}>Категория</h3>
            <Form.Item label="Категория" required noStyle>
              <Input.Group compact>
                <Form.Item
                  name="category"
                  label={
                    <span>
                      Категория<span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  rules={[
                    {
                      message: "Пожалуйста, выберите категорию",
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Выберите категорию"
                    className={styles.categorySelect}
                    dropdownClassName={styles.categoryDropdown}
                  >
                    {categories.map((cat) =>
                      cat.children ? (
                        <OptGroup
                          key={cat.value}
                          label={cat.label}
                          className={styles.categoryOption}
                        >
                          {cat.children.map((child) => (
                            <Option
                              key={child.value}
                              value={child.value}
                              className={styles.categoryOption}
                            >
                              {child.label}
                            </Option>
                          ))}
                        </OptGroup>
                      ) : (
                        <Option
                          key={cat.value}
                          value={cat.value}
                          className={styles.categoryOption}
                        >
                          {cat.label}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="additionalCategory"
                  label="Дополнительная категория"
                >
                  <Select
                    placeholder="Выберите категорию"
                    className={styles.additionalCategorySelect}
                    dropdownClassName={styles.categoryDropdown}
                  >
                    {categories.map((cat) =>
                      cat.children ? (
                        <OptGroup
                          key={cat.value}
                          label={cat.label}
                          className={styles.categoryOption}
                        >
                          {cat.children.map((child) => (
                            <Option
                              key={child.value}
                              value={child.value}
                              className={styles.categoryOption}
                            >
                              {child.label}
                            </Option>
                          ))}
                        </OptGroup>
                      ) : (
                        <Option
                          key={cat.value}
                          value={cat.value}
                          className={styles.categoryOption}
                        >
                          {cat.label}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </div>

          {/* Описание публикации */}
          <div className={styles.formElement}>
            <h3 className={styles.headerSubtitle}>Описание публикации</h3>
            <div className={styles.formGroupColumn}>
              <Form.Item
                name="name"
                label={
                  <div
                    className={styles.customLabel}
                    ref={labelRef}
                  >
                    <span>
                      Название лота<span className={styles.requiredMark}>*</span>
                    </span>
                    <span className={styles.charCounter} ref={charCounterRef}>0/100</span>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите название лота",
                  },
                ]}
                className={styles.nameField}
              >
                <Input
                  className={styles.inputLarge}
                  maxLength={100}
                  placeholder="Введите название"
                  onChange={(e) => {
                    if (charCounterRef.current) {
                      const currentLength = e.target.value.length;
                      charCounterRef.current.innerText = `${currentLength}/100`;
                    }
                  }}
                />
              </Form.Item>

              <div className={styles.formRow}>
                <Form.Item name="article" label="Артикул">
                  <Input
                    className={styles.inputArticle}
                    placeholder="Введите доп. информацию"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      Состояние<span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  className={styles.formItemCondition}
                >
                  <Radio.Group
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className={styles.radioButtons}
                  >
                    <Radio.Button
                      value="new"
                      className={`${styles.radioButtonCondition} ${
                        condition === "new" ? styles.active : styles.inactive
                      }`}
                    >
                      Новый
                    </Radio.Button>
                    <Radio.Button
                      value="used"
                      className={`${styles.radioButtonCondition} ${
                        condition === "used" ? styles.active : styles.inactive
                      }`}
                    >
                      Б/у
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="manufacturer"
                  label="Производитель"
                  rules={[
                    {
                      message: "Выберите производителя",
                      required: true,
                    },
                  ]}
                >
                  <Select
                    className={styles.manufacturer}
                    placeholder="Выберите производителя"
                  >
                    <Option className={styles.categoryOption} value="Bosch">
                      Bosch
                    </Option>
                    <Option className={styles.categoryOption} value="LG">
                      LG
                    </Option>
                    <Option className={styles.categoryOption} value="AEG">
                      AEG
                    </Option>
                  </Select>
                </Form.Item>
              </div>
              <div className={styles.formRow}>
                <Form.Item
                  name="scale"
                  label="Масштаб"
                  className={styles.formItem}
                  rules={[
                    {
                      message: "Нужен масштаб",
                      required: true,
                    },
                  ]}
                >
                  <Select className={styles.selectScale}>
                    <Option className={styles.categoryOption} value="1:18">
                      1:18
                    </Option>
                    <Option className={styles.categoryOption} value="1:24">
                      1:24
                    </Option>
                    <Option className={styles.categoryOption} value="1:32">
                      1:32
                    </Option>
                    <Option className={styles.categoryOption} value="1:64">
                      1:64
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item name="material" label="Материал">
                  <Select
                    placeholder="Выберите материал"
                    className={styles.selectMaterial}
                  >
                    <Option className={styles.categoryOption} value="plastic">
                      Пластик
                    </Option>
                    <Option className={styles.categoryOption} value="metal">
                      Металл
                    </Option>
                    <Option className={styles.categoryOption} value="wood">
                      Дерево
                    </Option>
                    <Option className={styles.categoryOption} value="composite">
                      Композит
                    </Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                label={
                  <span>
                    Описание<span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="description"
              >
                <Input.TextArea
                  className={styles.descriptionInput}
                  style={{ minHeight: "64px" }}
                  placeholder="Введите описание"
                  autoSize
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.buttonSubmit}
            >
              Создать лот
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LotForm;
