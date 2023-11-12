'use client';
import { FC } from 'react';
import { Page } from '@/components/';
import styles from './page.module.css';

const Home: FC = () => (
  <main className={styles.main}>
    <Page />
  </main>
);

export default Home;
