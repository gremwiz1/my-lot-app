"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLot } from "../../store/lotSlice";
import { Button, Form, Input, Select, Radio } from "antd";
import styles from "./lotForm.module.scss";
import PublicationTypeSelect from "../publicationTypeSelect/publicationTypeSelect";
import CategorySelect from "../categprySelect/categorySelect";
import { manufacturers } from "@/app/data/manufacturers";
import { scales } from "@/app/data/scales";
import { materials } from "@/app/data/materials";

const LotForm: React.FC<{ onCreateLot: () => void }> = ({ onCreateLot }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [condition, setCondition] = useState("new");
  const [publicationType, setPublicationType] = useState("announcement");

  const handleSubmit = (values: any) => {
    dispatch(addLot({ ...values, type: publicationType }));
    form.resetFields();
    onCreateLot();
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
      <section>
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
            <PublicationTypeSelect
              publicationType={publicationType}
              onChange={setPublicationType}
            />
          </div>

          {/* Категории */}
          <div className={styles.formElement}>
            <h3 className={styles.headerSubtitle}>Категория</h3>
            <CategorySelect />
          </div>

          {/* Описание публикации */}
          <div className={styles.formElement}>
            <h3 className={styles.headerSubtitle}>Описание публикации</h3>
            <div className={styles.formGroupColumn}>
              <Form.Item
                name="name"
                label={
                  <div className={styles.customLabel} ref={labelRef}>
                    <span>
                      Название лота
                      <span className={styles.requiredMark}>*</span>
                    </span>
                    <span className={styles.charCounter} ref={charCounterRef}>
                      0/100
                    </span>
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
                    { message: "Выберите производителя", required: true },
                  ]}
                >
                  <Select
                    placeholder="Выберите производителя"
                    className={styles.manufacturer}
                  >
                    {manufacturers.map((item) => (
                      <Select.Option
                        key={item.value}
                        value={item.value}
                        className={styles.categoryOption}
                      >
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className={styles.formRow}>
                <Form.Item
                  name="scale"
                  label="Масштаб"
                  rules={[{ message: "Нужен масштаб", required: true }]}
                >
                  <Select
                    placeholder="Выберите масштаб"
                    className={styles.selectScale}
                  >
                    {scales.map((item) => (
                      <Select.Option
                        key={item.value}
                        value={item.value}
                        className={styles.categoryOption}
                      >
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="material" label="Материал">
                  <Select
                    placeholder="Выберите материал"
                    className={styles.selectMaterial}
                  >
                    {materials.map((item) => (
                      <Select.Option
                        key={item.value}
                        value={item.value}
                        className={styles.categoryOption}
                      >
                        {item.label}
                      </Select.Option>
                    ))}
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
      </section>
    </div>
  );
};

export default LotForm;
