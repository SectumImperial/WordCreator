/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ru } from 'date-fns/locale';
import { useState, ChangeEvent, MouseEvent, FormEvent, useEffect } from 'react';
import { downloadWordFile } from '@/utils/downLoadWordFile';
import { FormData, FormErrors, ParsedData } from '@/interface';
import { Button } from '@/components/';
import styles from './contract-form.module.css';

interface ContractFormProps {
  parsedData: ParsedData;
}

const initialFormData = {
  contract_date: '',
  company_post_address: '',
  company_name_full: '',
  company_name_short: '',
  person_full: '',
  person_short: '',
  person_action: '',
  position: '',
  inn: '',
  kpp: '',
  bic: '',
  ogrn: '',
  bank: '',
  rs: '',
  ks: '',
  email: '',
  project_days: '',
  total_amount: '',
  imprest_amount: '',
  object_address: '',
  object_name: '',
  company_address: '',
};

export const ContractForm = ({ parsedData }: ContractFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      company_name_full:
        parsedData.company_name_full || prevData.company_name_full,
      person_full: parsedData.person_full || prevData.person_full,
      person_action: parsedData.person_action || prevData.person_action,
      position: parsedData.position || prevData.position,
      inn: parsedData.inn || prevData.inn,
      kpp: parsedData.kpp || prevData.kpp,
      ogrn: parsedData.ogrn || prevData.ogrn,
      bic: parsedData.bic || prevData.bic,
      rs: parsedData.rs || prevData.rs,
      ks: parsedData.ks || prevData.ks,
      email: parsedData.email || prevData.email,
    }));
  }, [parsedData]);

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    switch (name) {
    case 'inn':
      errorMsg = /^\d{10}$/.test(value) ? '' : 'ИНН должен содержать 10 цифр';
      break;
    case 'kpp':
      errorMsg = /^\d{9}$/.test(value) ? '' : 'КПП должен содержать 9 цифр';
      break;
    case 'bic':
      errorMsg = /^\d{9}$/.test(value) ? '' : 'БИК должен содержать 9 цифр';
      break;
    case 'ogrn':
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
    console.log(name, value);
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

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const dataForDownload = { ...formData };

    if (dataForDownload.contract_date) {
      dataForDownload.contract_date = format(
        new Date(dataForDownload.contract_date),
        'dd MMMM yyyy года',
        { locale: ru }
      );
    }
    downloadWordFile(dataForDownload, file);
    setFormData(initialFormData);
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Основная информация</legend>

        <label className={styles.label}>
          <span>Полное название компании</span>
          <input
            name='company_name_full'
            value={formData.company_name_full}
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
            value={formData.company_name_short}
            onChange={handleChange}
            placeholder='ООО "Рога и Копыта'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Юридический адрес компании</span>
          <input
            name='company_address'
            value={formData.company_address}
            onChange={handleChange}
            placeholder='232432, Москва, ул. Пушкина, дом Колотушкина 6'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Почтовый адрес компании</span>
          <input
            name='company_post_address'
            value={formData.company_post_address}
            onChange={handleChange}
            placeholder='121213, Москва, ул. Пушкина, дом Колотушкина 6'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>ФИО полностью</span>
          <input
            name='person_full'
            value={formData.person_full}
            onChange={handleChange}
            placeholder='Кабанов Кабан Кабанович'
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          <span>Действует на основании</span>
          <input
            type='text'
            name='person_action'
            value={formData.person_action}
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
            name='contract_date'
            value={formData.contract_date}
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
            value={formData.object_name}
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
            value={formData.object_address}
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
            value={formData.position}
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
            name='inn'
            value={formData.inn}
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
            name='kpp'
            value={formData.kpp}
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
            name='bic'
            value={formData.bic}
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
            name='ogrn'
            value={formData.ogrn}
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
            name='bank'
            onChange={handleChange}
            value={formData.bank}
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
            value={formData.rs}
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
            value={formData.ks}
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
            value={formData.email}
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
            value={formData.project_days}
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
            value={formData.total_amount}
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
            value={formData.imprest_amount}
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
          <Button
            text='Создать документ'
            handler={handleSubmit}
            disabled={!file}
          />
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
