import "./MultiPageForm.scss";
import { ReactElement, useRef, useState } from "react";
import ProgressSidebar from "./ProgressSidebar";
import MainContentContainer from "./MainContentContainer";
/*
Alternative way to share page state between components
import { currentPageContext } from "../currentContext";
 */
export default function MultiPageForm({
    children,
}: {
    children: ReactElement[];
}) {
    const [pages, setPages] = useState({
        current: 0,
        length: children.length,
    });
    console.log(children);
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
        </>
    );
}
