import React, { PropsWithChildren } from "react";
import Header from "./Header";
import styles from "../styles/Layout.module.css"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.body}>
      <Header />
      {children}
    </div>
  );
};
export default Layout;
