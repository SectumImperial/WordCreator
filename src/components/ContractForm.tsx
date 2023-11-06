/* eslint-disable indent */
import { useState, ChangeEvent, FormEvent } from 'react';
import { downloadWordFile } from '@/utils/downLoadWordFile';
import { FormData, FormErrors } from '@/interface';
import styles from './contract-form.module.css';

export const ContractForm = () => {
  const [formData, setFormData] = useState<FormData>({
    company_name_full: 'string',
    company_name_short: 'string',
    person_full: 'string',
    person_short: 'string',
    person_action: 'string',
    gender: 'male',
    position: 'string',
    INN: 1234567890,
    KPP: 123456789,
    BIC: 23,
    OGRN: 23,
    Bank: 'string',
    rs: 23,
    ks: 23,
    email: 'string',
    project_days: 23,
    total_amount: 23,
    imprest_amount: 23,
  });

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    switch (name) {
      case 'INN':
        errorMsg = /^\d{10}$/.test(value) ? '' : 'ИНН должен содержать 10 цифр';
        break;
      case 'KPP':
        errorMsg = /^\d{9}$/.test(value) ? '' : 'КПП должен содержать 9 цифр';
        break;
      case 'BIC':
        errorMsg = /^\d{9}$/.test(value) ? '' : 'БИК должен содержать 9 цифр';
        break;
      case 'OGRN':
        errorMsg = /^\d{13}$/.test(value)
          ? ''
          : 'ОГРН должен содержать 13 цифр';
        break;
      case 'rs':
      case 'ks':
        errorMsg = /^\d{20}$/.test(value)
          ? ''
          : 'Счет должен содержать 20 цифр';
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    downloadWordFile(formData, file);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Основная информация</legend>

        <label className={styles.label}>
          <span>Полное название компании</span>
          <input
            name='company_name_full'
            onChange={handleChange}
            placeholder='Общество с ограниченной ответсвтенностью "Рога и Копыта"'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Краткое название компании</span>
          <input
            name='company_name_short'
            onChange={handleChange}
            placeholder='ООО "Рога и Копыта'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>ФИО полностью</span>
          <input
            name='person_full'
            onChange={handleChange}
            placeholder='Кабанова Кабана Кабановича'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Действует на основании</span>
          <input
            type='text'
            name='person_action'
            onChange={handleChange}
            placeholder='Устава'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Дата</span>
          <input
            type='date'
            name='date'
            onChange={handleChange}
            placeholder='ДД/ММ/ГГГГ'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Название объекта</span>
          <input
            type='text'
            name='object_name'
            onChange={handleChange}
            placeholder='Жилой дом'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Адрес объекта</span>
          <input
            type='text'
            name='object_address'
            onChange={handleChange}
            placeholder='Москва, ул. Пушкина, дом Колотушкина 6'
            className={styles.input}
            required
          />
        </label>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type='radio'
              name='gender'
              value='male'
              onChange={handleChange}
              className={styles.radio}
            />
            <span>Мужской</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type='radio'
              name='gender'
              value='female'
              onChange={handleChange}
              className={styles.radio}
            />
            <span>Женский</span>
          </label>
        </div>

        <label className={styles.label}>
          <span>Должность</span>
          <input
            name='position'
            onChange={handleChange}
            placeholder='Директор'
            className={styles.input}
            required
          />
        </label>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Финансовая информация</legend>

        <label className={styles.label}>
          <span>ИНН</span>
          <input
            type='text'
            name='INN'
            onChange={handleChange}
            placeholder='1234567890'
            className={
              errors.INN ? `${styles.input} ${styles.inputError}` : styles.input
            }
          />
          {errors.INN && <div className={styles.errorMsg}>{errors.INN}</div>}
        </label>

        <label className={styles.label}>
          <span>КПП</span>
          <input
            type='text'
            name='KPP'
            onChange={handleChange}
            placeholder='123456789'
            className={
              errors.KPP ? `${styles.input} ${styles.inputError}` : styles.input
            }
          />
          {errors.KPP && <div className={styles.errorMsg}>{errors.KPP}</div>}
        </label>

        <label className={styles.label}>
          <span>БИК</span>
          <input
            type='number'
            name='BIC'
            onChange={handleChange}
            placeholder='БИК'
            className={
              errors.BIC ? `${styles.input} ${styles.inputError}` : styles.input
            }
          />
          {errors.BIC && <div className={styles.errorMsg}>{errors.BIC}</div>}
        </label>

        <label className={styles.label}>
          <span>ОГРН</span>
          <input
            type='number'
            name='OGRN'
            onChange={handleChange}
            placeholder='ОГРН'
            className={
              errors.BIC ? `${styles.input} ${styles.inputError}` : styles.input
            }
          />
          {errors.OGRN && <div className={styles.errorMsg}>{errors.OGRN}</div>}
        </label>

        <label className={styles.label}>
          <span>Банк</span>
          <input
            name='Bank'
            onChange={handleChange}
            placeholder='Банк'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Р.С</span>
          <input
            type='number'
            name='rs'
            onChange={handleChange}
            placeholder='12345678901234567890'
            className={
              errors.rs ? `${styles.input} ${styles.inputError}` : styles.input
            }
          />
          {errors.rs && <div className={styles.errorMsg}>{errors.rs}</div>}
        </label>

        <label className={styles.label}>
          <span>К.С</span>
          <input
            type='number'
            name='ks'
            onChange={handleChange}
            placeholder='12345678901234567890'
            className={
              errors.ks ? `${styles.input} ${styles.inputError}` : styles.input
            }
          />
          {errors.ks && <div className={styles.errorMsg}>{errors.ks}</div>}
        </label>

        <label className={styles.label}>
          <span>Email</span>
          <input
            name='email'
            type='email'
            onChange={handleChange}
            placeholder='email'
            className={styles.input}
            required
          />
        </label>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Сроки и суммы</legend>

        <label className={styles.label}>
          <span>Срок выполнения услуг (дней)</span>
          <input
            type='number'
            name='project_days'
            onChange={handleChange}
            placeholder='Срок выполнения услуг (дней)'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Сумма за услуги полностью</span>
          <input
            type='number'
            name='total_amount'
            onChange={handleChange}
            placeholder='Сумма за услуги полностью'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Аванс</span>
          <input
            type='number'
            name='imprest_amount'
            onChange={handleChange}
            placeholder='Аванс'
            className={styles.input}
            required
          />
        </label>
      </fieldset>

      <div className={styles.fileNavigation}>
        <input
          type='file'
          onChange={handleFileChange}
          className={styles.fileInput}
          required
        />
        <div className={styles.tooltip}>
          <button type='submit' disabled={!file} className={styles.button}>
            <span>Создать документ</span>
          </button>
          {!file && (
            <span className={styles.tooltiptext}>
              <span>Загрузите файл для активации</span>
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
