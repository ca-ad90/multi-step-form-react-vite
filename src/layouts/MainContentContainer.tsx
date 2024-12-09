/*
import { PageProps } from "./Page";
//import { currentPageContext } from "../currentContext";
interface MainContentContainerProps {
    handlePageChange: (currentPage: number) => void;
    pages: { current: number; length: number };
    children: ReactNode[];
}
export default function MainContentContainer({
    handlePageChange,
    pages,
}: MainContentContainerProps) {
    //const { currentPage, setCurrentPage } = useContext(currentPageContext);
    const [isReverse, setIsReverse] = useState(false);
    const fieldSet = useRef<(HTMLFieldSetElement | null)[]>([]);

    function changePage(nextPage: number) {
        setIsReverse(nextPage < pages.current);
        console.log("reverse", isReverse);
        console.log(nextPage, { x: fieldSet.current[pages.current] });
        console.log(
            fieldSet.current[pages.current] && nextPage > pages.current,
        );
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
                        console.log((inp.name, inp.value));
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

        </>
    );
}
*/
