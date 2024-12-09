import "./MultiPageForm.scss";
import {
    cloneElement,
    isValidElement,
    ReactElement,
    useRef,
    useState,
} from "react";
import ProgressSidebar from "./ProgressSidebar";

import { FormContext } from "../contexts/formContext";
import { useFormHook } from "../hooks/useFromHook";
import { Button } from "../components/Button";
import styles from "./MainContentContainer.module.scss";

export default function MultiPageForm({
    children,
    pageNames,
}: {
    children: ReactElement[];
    pageNames?: string[];
}) {
    useFormHook(FormContext);
    const [formState, setFormState] = useState({});
    const formRef = useRef<HTMLFormElement>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageChange = (nextPage: number) => {
        const newPage =
            nextPage < 0
                ? 0
                : nextPage > children.length
                ? children.length
                : nextPage;
        setCurrentPage(newPage);
    };
    return (
        <>
            <FormContext.Provider
                value={{ form: formState, setForm: setFormState }}>
                <form ref={formRef} className="multi-page-form">
                    <ProgressSidebar
                        currentPage={currentPage}
                        titles={
                            pageNames
                                ? pageNames
                                : children.map((e) => e.props.title)
                        }
                        handlePageChange={handlePageChange}
                    />
                    <div className={styles.mainContent}>
                        <div className={styles.mainWrapper}>
                            {children.map((e, i) => {
                                if (isValidElement(e)) {
                                    return (
                                        <fieldset
                                            key={i}
                                            className={`${
                                                currentPage == i
                                                    ? "show"
                                                    : "hide"
                                            }`}>
                                            {cloneElement(e)}
                                        </fieldset>
                                    );
                                }
                                return null;
                            })}

                            <div className={styles.buttonWrapper}>
                                <Button secondary onClick={() => {}}>
                                    Go Back
                                </Button>
                                <Button
                                    onClick={() => {}}
                                    disabled={currentPage == children.length}>
                                    Next Step
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormContext.Provider>
        </>
    );
}
