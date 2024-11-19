import "./App.scss";
import MultiPagedFrom from "./layouts/MultiPageForm";
import { Input } from "./components/Input";
import Page from "./layouts/Page";
import { useState } from "react";
import OverLay from "./layouts/OverLay";

function App() {
    const imgs = [
        "design/active-states-step-1.jpg",
        "design/active-states-step-2.jpg",
        "design/active-states-step-3.jpg",
        "design/active-states-step-4.jpg",
        "design/desktop-design-step-1.jpg",
        "design/desktop-design-step-2-monthly.jpg",
        "design/desktop-design-step-2-yearly.jpg",
        "design/desktop-design-step-3-monthly.jpg",
        "design/desktop-design-step-3-yearly.jpg",
        "design/desktop-design-step-4-monthly.jpg",
        "design/desktop-design-step-4-yearly.jpg",
        "design/desktop-design-step-5.jpg",
        "design/desktop-preview.jpg",
        "design/mobile-design-step-1.jpg",
        "design/mobile-design-step-2-monthly.jpg",
        "design/mobile-design-step-2-yearly.jpg",
        "design/mobile-design-step-3-monthly.jpg",
        "design/mobile-design-step-3-yearly.jpg",
        "design/mobile-design-step-4-monthly.jpg",
        "design/mobile-design-step-4-yearly.jpg",
        "design/mobile-design-step-5.jpg",
    ];
    const [value, setValue] = useState("");
    return (
        <>
            <MultiPagedFrom>
                <Page title="First Page" text="this is the first page">
                    <Input required label="test"></Input>
                    {value}
                    <button
                        onClick={() => {
                            setValue("hejsan");
                        }}
                        type="button">
                        hej
                    </button>
                </Page>
                <Page title="Second Page" text="this is the first page">
                    <input></input>
                </Page>
            </MultiPagedFrom>
            <OverLay imgs={imgs}></OverLay>
        </>
    );
}

export default App;
