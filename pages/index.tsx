import Head from "next/head";
import { Header } from "../components/header/header";
import { NavigationMenu } from "../components/navigation-menu/navigation-menu";
// import styles from "../styles/Home.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import your icons
import { faCode, faHighlighter } from "@fortawesome/free-solid-svg-icons";
import Customers from "./customers";
import { MainLayout } from "../components/layouts/layout";
// import { Customer } from "../types/type";

export default function Home() {
  return (
    <MainLayout title="admin">
      <div></div>
    </MainLayout>
  );
}
