import {
    isValidElement,
    cloneElement,
    useRef,
    useState,
    useContext,
    ReactNode,
} from "react";
import ProgressSidebar from "../ProgressSidebar/ProgressSidebar";
import { ThankYou } from "../Pages/Page";
import { FormContext } from "../../contexts/formContext";

import { Button } from "../Button";
import styles from "./MultiPageForm.module.scss";
export default function MultiPageForm({
    pageNames,
    children,
}: {
    children: ReactNode[];
    pageNames: string[];
}) {
    const { formPage } = useContext(FormContext);
    const formRef = useRef<HTMLFormElement>(null);
    const pageRefs = useRef<HTMLFieldSetElement[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (nextPage: number) => {
        if (currentPage == Object.keys(pageNames).length) return;
        if (pageRefs && nextPage > currentPage) {
            let isValid = true;
            let newPage = currentPage;
            const pageCount = nextPage - currentPage;
            for (let i = 0; i < pageCount; i++) {
                newPage = currentPage + i;
                pageRefs.current[newPage]
                    .querySelectorAll("input")
                    .forEach((e) => {
                        console.log("valid check", e.name, e.validity.valid);
                        if (!e.validity.valid) {
                            e.reportValidity();
                            isValid = false;
                        }
                    });
                if (!isValid) break;
            }

            if (!isValid) {
                setCurrentPage(newPage);
                return;
            }
        }

        const newPage =
            nextPage < 0
                ? 0
                : nextPage > pageNames.length
                ? pageNames.length
                : nextPage;

        setCurrentPage(newPage);
    };

    return (
        <>
            <FormContext.Provider
                value={{ formPage, setFormPage: handlePageChange }}>
                <form ref={formRef} className={styles["multi-page-form"]}>
                    <ProgressSidebar
                        currentPage={currentPage}
                        titles={pageNames.map((e) => e)}
                        handlePageChange={handlePageChange}
                    />
                    <div className={styles.mainContent}>
                        <div className={styles.mainWrapper}>
                            {children.map((E, i) => {
                                if (isValidElement(E)) {
                                    return (
                                        <fieldset
                                            ref={(el: HTMLFieldSetElement) => {
                                                pageRefs.current[i] = el;
                                            }}
                                            key={i}
                                            className={`page ${
                                                currentPage == i
                                                    ? "show"
                                                    : "hide"
                                            }`}>
                                            {cloneElement(E)}
                                        </fieldset>
                                    );
                                }
                                return null;
                            })}
                            {currentPage == pageNames.length && (
                                <>
                                    <ThankYou></ThankYou>
                                </>
                            )}
                            {currentPage < pageNames.length && (
                                <div className={styles.buttonWrapper}>
                                    <Button
                                        secondary
                                        onClick={() => {
                                            handlePageChange(currentPage - 1);
                                        }}>
                                        Go Back
                                    </Button>
                                    {(currentPage < pageNames.length - 1 && (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    handlePageChange(
                                                        currentPage + 1,
                                                    );
                                                }}
                                                disabled={
                                                    currentPage ==
                                                    pageNames.length
                                                }>
                                                Next Step
                                            </Button>
                                        </>
                                    )) || (
                                        <>
                                            <Button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    handlePageChange(
                                                        pageNames.length,
                                                    );
                                                }}
                                                type="button">
                                                Submit
                                            </Button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>{" "}
                    {currentPage < pageNames.length && (
                        <div className={styles.buttonWrapperMobile}>
                            <Button
                                secondary
                                onClick={() => {
                                    handlePageChange(currentPage - 1);
                                }}>
                                Go Back
                            </Button>
                            {(currentPage < pageNames.length - 1 && (
                                <>
                                    <Button
                                        onClick={() => {
                                            handlePageChange(currentPage + 1);
                                        }}
                                        disabled={
                                            currentPage == pageNames.length
                                        }>
                                        Next Step
                                    </Button>
                                </>
                            )) || (
                                <>
                                    <Button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handlePageChange(pageNames.length);
                                        }}
                                        type="button">
                                        Submit
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </form>
            </FormContext.Provider>
        </>
    );
}
