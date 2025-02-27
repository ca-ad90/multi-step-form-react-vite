import MultiPagedFrom from "./components/MultiPageForm/MultiPageForm";
import {
    FirstPage,
    SecondPage,
    SummaryPage,
    ThirdPage,
} from "./components/Pages/Page";
import "./App.scss";

function App() {
    const pageNames = ["Your info", "Select plan", "Add-ons", "Summary"];
    return (
        <>
            <MultiPagedFrom pageNames={pageNames}>
                <FirstPage />
                <SecondPage />
                <ThirdPage />
                <SummaryPage />
            </MultiPagedFrom>
        </>
    );
}

export default App;
