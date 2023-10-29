'use client';

// import Image from 'next/image'
// import styles from './page.module.css'
import { FC } from 'react';
import { ContractForm } from '@/components/ContractForm';
import styles from './page.module.css';

const Home: FC = () => (
  <main className={styles.main}>
    <ContractForm />
  </main>
);

export default Home;
