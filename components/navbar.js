import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const Navbar = ({}) => {
  const router = useRouter();
  const { asPath } = router;
  return (
    <div className={styles.main}>
      <Link href="/">
        <div className={asPath === "/" ? styles.active : ""}>Home</div>
      </Link>
      <Link href="/article">
        <div className={asPath === "/article" ? styles.active : ""}>Create Article</div>
      </Link>
      <Link href="/articles?page=1">
        <div className={asPath.includes("articles") ? styles.active : ""}>Articles</div>
      </Link>
    </div>
  );
};
export default Navbar;
