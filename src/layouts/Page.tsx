import { ReactNode } from "react";
import styles from "./Page.module.scss";
interface PageProps {
    title: string;
    text: string;
    children: ReactNode;
}
export default function Page(props: PageProps) {
    const { title, text, children } = props;
    return (
        <>
            <h1>{title}</h1>
            <p id={`page${1}`}>{text}</p>
            <div className={styles.content}>{children}</div>
        </>
    );
}
