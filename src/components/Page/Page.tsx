import { useState } from 'react';
import { DataField, ContractForm, InstructionMarks } from '@/components';
import styles from './page.module.css';

export const Page = () => {
  const [parsedData, setParsedData] = useState({});

  return (
    <div className={styles.page}>
      <InstructionMarks />
      <ContractForm parsedData={parsedData} />
      <DataField setParsedData={setParsedData} />
    </div>
  );
};
