import "./MultiPageForm.scss";
import { ReactElement, useState } from "react";
import ProgressSidebar from "./ProgressSidebar";
import MainContentContainer from "./MainContentContainer";
/*
Alternative way to share page state between components
import { currentPageContext } from "../formContext";
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
            <form className="multi-page-form">
                {/*           <currentPageContext.Provider value={{ pages, setPages }}> */}
                <ProgressSidebar
                    pages={pages}
                    titles={["your info", "my Info", "their info"]}
                    handlePageChange={handlePageChange}
                />
                <MainContentContainer
                    handlePageChange={handlePageChange}
                    pages={pages}>
                    {children && children[pages.current]}
                </MainContentContainer>
                {/*         </currentPageContext.Provider> */}
            </form>
        </>
    );
}
