import { ReactNode } from "react";
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
            {children}{" "}
        </>
    );
}
