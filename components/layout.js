import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
const Layout = ({ children }) => {
  return (
    <div className={styles.main}>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
