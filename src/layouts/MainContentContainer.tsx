import { Button } from "../components/Button";
import styles from "./MainContentContainer.module.scss";
import { ReactNode, useRef } from "react";
//import { currentPageContext } from "../currentContext";
interface MainContentContainerProps {
    handlePageChange: (currentPage: number) => void;
    pages: { current: number; length: number };
    children: ReactNode[];
}
export default function MainContentContainer({
    handlePageChange,
    pages,
    children,
}: MainContentContainerProps) {
    //const { currentPage, setCurrentPage } = useContext(currentPageContext);
    const fieldSet = useRef<(HTMLFieldSetElement | null)[]>([]);
    function changePage(nextPage: number) {
        console.log(nextPage, { x: fieldSet.current[pages.current] });
        if (fieldSet.current[pages.current] && nextPage > pages.current) {
            let valid = true;
            const inputs = Array.from(
                fieldSet.current[pages.current]!.elements,
            ) as (HTMLSelectElement | HTMLInputElement)[];
            for (const inp of inputs) {
                if (
                    inp instanceof HTMLInputElement ||
                    inp instanceof HTMLSelectElement
                ) {
                    if (!inp.reportValidity()) {
                        valid = false;
                    }
                }
            }
            if (!valid) return;
        }
        handlePageChange(nextPage);
    }
    return (
        <>
            <div className={styles.mainContent}>
                <div className={styles.mainWrapper}>
                    {children &&
                        children.map((child, index) => (
                            <fieldset
                                id={`fieldset${index}`}
                                ref={(e) => {
                                    fieldSet.current[index] = e;
                                }}
                                key={index}
                                style={{
                                    display:
                                        index === pages.current
                                            ? "block"
                                            : "none",
                                }}>
                                {child}
                            </fieldset>
                        ))}

                    <div className={styles.buttonWrapper}>
                        <Button
                            secondary
                            onClick={() => changePage(pages.current - 1)}>
                            Go Back
                        </Button>
                        <Button
                            onClick={() => changePage(pages.current + 1)}
                            disabled={pages.current === pages.length}>
                            Next Step
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
