import "./MultiPageForm.scss";
import { ReactElement, useRef, useState } from "react";
import ProgressSidebar from "./ProgressSidebar";
import MainContentContainer from "./MainContentContainer";
/*
Alternative way to share page state between components*/
import { pageContext } from "../contexts/pageContext";

export default function MultiPageForm({
    children,
}: {
    children: ReactElement[];
}) {
    const [pages, setPages] = useState({
        current: 0,
        length: children.length,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const form = useRef<HTMLFormElement>(null);

    const handlePageChange = (nextPage: number) => {
        console.log(nextPage);
        const newPage =
            nextPage < 0
                ? 0
                : nextPage > children.length
                ? children.length
                : nextPage;
        setPages({
            ...pages,
            current: newPage,
        });
    };
    return (
        <>
            <pageContext.Provider value={{ pages, setPages }}>
                <form ref={form} className="multi-page-form">
                    {/*           <currentPageContext.Provider value={{ pages, setPages }}> */}
                    <ProgressSidebar
                        pages={pages}
                        titles={["your info", "my Info", "their info"]}
                        handlePageChange={handlePageChange}
                    />
                    <MainContentContainer
                        handlePageChange={handlePageChange}
                        pages={pages}>
                        {children}
                    </MainContentContainer>
                    {/*         </currentPageContext.Provider> */}
                </form>
            </pageContext.Provider>
        </>
    );
}
