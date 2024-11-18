import "./MainContentContainer.scss";
import { ReactNode } from "react";
//import { currentPageContext } from "../currentContext";
interface MainContentContainerProps {
    handlePageChange: (currentPage: number) => void;
    pages: { current: number; length: number };
    children: ReactNode;
}
export default function MainContentContainer({
    handlePageChange,
    pages,
    children,
}: MainContentContainerProps) {
    //const { currentPage, setCurrentPage } = useContext(currentPageContext);

    return (
        <>
            <div className="main-content">
                <div className="main-wrapper">
                    <>{children}</>
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            height: "50px",
                            width: "100%",
                            background: "red",
                        }}>
                        <button
                            type="button"
                            onClick={() => handlePageChange(pages.current + 1)}
                            className="next">
                            NEXT
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePageChange(pages.current - 1)}
                            className="PREV">
                            PREV
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
