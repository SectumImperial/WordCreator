import { useState, ChangeEvent, FormEvent } from 'react';
import { downloadWordFile } from '@/utils/downLoadWordFile';
import { FormData } from '@/interface';
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
    INN: 23,
    KPP: 23,
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          Полное название компании
          <input
            name='company_name_full'
            onChange={handleChange}
            placeholder='Полное название компании'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Краткое название компании
          <input
            name='company_name_short'
            onChange={handleChange}
            placeholder='Краткое название компании'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          ФИО полностью
          <input
            name='person_full'
            onChange={handleChange}
            placeholder='ФИО полностью'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Действует на основании
          <input
            name='person_action'
            onChange={handleChange}
            placeholder='Действует на основании'
            className={styles.input}
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
            Мужской
          </label>
          <label className={styles.radioLabel}>
            <input
              type='radio'
              name='gender'
              value='female'
              onChange={handleChange}
              className={styles.radio}
            />
            Женский
          </label>
        </div>

        <label className={styles.label}>
          Должность
          <input
            name='position'
            onChange={handleChange}
            placeholder='Должность'
            className={styles.input}
          />
        </label>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Финансовая информация</legend>

        <label className={styles.label}>
          ИНН
          <input
            type='number'
            name='INN'
            onChange={handleChange}
            placeholder='ИНН'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          КПП
          <input
            type='number'
            name='KPP'
            onChange={handleChange}
            placeholder='КПП'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          БИК
          <input
            type='number'
            name='BIC'
            onChange={handleChange}
            placeholder='БИК'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          ОГРН
          <input
            type='number'
            name='OGRN'
            onChange={handleChange}
            placeholder='ОГРН'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Банк
          <input
            name='Bank'
            onChange={handleChange}
            placeholder='Банк'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Р.С
          <input
            type='number'
            name='rs'
            onChange={handleChange}
            placeholder='Р.С'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          К.С
          <input
            type='number'
            name='ks'
            onChange={handleChange}
            placeholder='К.С'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            name='email'
            type='email'
            onChange={handleChange}
            placeholder='email'
            className={styles.input}
          />
        </label>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Сроки и суммы</legend>

        <label className={styles.label}>
          Срок выполнения услуг (дней)
          <input
            type='number'
            name='project_days'
            onChange={handleChange}
            placeholder='Срок выполнения услуг (дней)'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Сумма за услуги полностью
          <input
            type='number'
            name='total_amount'
            onChange={handleChange}
            placeholder='Сумма за услуги полностью'
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Аванс
          <input
            type='number'
            name='imprest_amount'
            onChange={handleChange}
            placeholder='Аванс'
            className={styles.input}
          />
        </label>
      </fieldset>

      <div className={styles.fileNavigation}>
        <input
          type='file'
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <div className={styles.tooltip}>
          <button type='submit' disabled={!file} className={styles.button}>
            Generate Document
          </button>
          {!file && (
            <span className={styles.tooltiptext}>
              Загрузите файл для активации
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
