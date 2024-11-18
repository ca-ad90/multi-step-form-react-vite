import { Button } from "../components/Button";
import styles from "./MainContentContainer.module.scss";
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
            <div className={styles.mainContent}>
                <div className={styles.mainWrapper}>
                    <>{children}</>
                    <div className={styles.buttonWrapper}>
                        <Button
                            onClick={() => handlePageChange(pages.current + 1)}>
                            Next Step
                        </Button>
                        <Button
                            secondary
                            onClick={() => handlePageChange(pages.current - 1)}
                            disabled={pages.current === pages.length - 1}>
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
