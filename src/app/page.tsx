'use client';
import { FC } from 'react';
import { ContractForm, DataField, InstructionMarks } from '@/components/';
import styles from './page.module.css';

const Home: FC = () => (
  <main className={styles.main}>
    <InstructionMarks />
    <ContractForm />
    <DataField />
  </main>
);

export default Home;
