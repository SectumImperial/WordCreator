import { Fragment } from 'react';
import styles from './instruction-marks.module.css';

const marksInstructions = [
  {
    mark: '{company_name_full}',
    instruction: 'Введите полное название компании.',
  },
  {
    mark: '{company_name_short}',
    instruction: 'Введите краткое название компании.',
  },
  { mark: '{person_full}', instruction: 'Введите полное ФИО.' },
  { mark: '{company_address}', instruction: 'Введите юр. адрес компании' },
  {
    mark: '{company_post_address}',
    instruction: 'Введите почтовый адрес компании.',
  },
  { mark: '{person_short}', instruction: 'ФИО с инициалами.' },
  {
    mark: '{person_action}',
    instruction: 'Введите основание действий (например, Устав).',
  },
  { mark: '{gender}', instruction: 'Укажите пол.' },
  { mark: '{position}', instruction: 'Введите должность.' },
  { mark: '{inn}', instruction: 'Введите ИНН.' },
  { mark: '{kpp}', instruction: 'Введите КПП.' },
  { mark: '{bic}', instruction: 'Введите БИК.' },
  { mark: '{ogrn}', instruction: 'Введите ОГРН.' },
  { mark: '{bank}', instruction: 'Введите название банка.' },
  { mark: '{rs}', instruction: 'Введите расчетный счет.' },
  { mark: '{ks}', instruction: 'Введите корреспондентский счет.' },
  { mark: '{email}', instruction: 'Введите адрес электронной почты.' },
  {
    mark: '{project_days}',
    instruction: 'Укажите срок выполнения услуг в днях.',
  },
  { mark: '{total_amount}', instruction: 'Введите общую сумму за услуги.' },
  { mark: '{imprest_amount}', instruction: 'Укажите сумму аванса.' },
  { mark: '{remaining_amount}', instruction: 'Остаток аванса.' },
  { mark: '{object_name}', instruction: 'Введите имя объекта.' },
  { mark: '{object_address}', instruction: 'Введите адрес объекта.' },
  { mark: '{contract_date}', instruction: 'Укажите дату.' },
  {
    mark: '{total_amount_word}',
    instruction: 'Словесное обозначение общей суммы за услуги.',
  },
  {
    mark: '{imprest_amount_word}',
    instruction: 'Словесное обозначение суммы аванса.',
  },
  {
    mark: '{remaining_amount_word}',
    instruction: 'Словесное обозначение остатка аванса.',
  },
  {
    mark: '{project_days_word}',
    instruction: 'Словесное обозначение срока выполнения услуг в днях.',
  },
];

export const InstructionMarks = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Инструкция по заполнению меток в документе
      </h2>
      <dl>
        {marksInstructions.map((item, index) => (
          <Fragment key={index}>
            <dt className={styles.description}>
              <code className={styles.codeMark}>{item.mark}</code>
            </dt>
            <dd className={styles.definition}>{item.instruction}</dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
};
