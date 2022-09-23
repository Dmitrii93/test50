import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span>News</span> App by Dmitrii Bledniuc
        </h1>
      </div>
    </>
  );
}
