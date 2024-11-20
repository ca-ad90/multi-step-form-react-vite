import "./App.scss";
import MultiPagedFrom from "./layouts/MultiPageForm";
import { Input } from "./components/Input";
import Page from "./layouts/Page";

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

    return (
        <>
            <MultiPagedFrom>
                <Page title="First Page" text="this is the first page">
                    <Input type="text" required label="Name"></Input>
                    <Input required type="email" label="Email"></Input>
                    <Input type="phone" label="Phone Number"></Input>
                    <select name="test" id="t">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </Page>
                <Page title="Second Page" text="this is the first page">
                    <Input type="text" required label="Name2"></Input>
                    <Input type="email" label="Email3"></Input>
                    <Input type="phone" label="Phone Number3"></Input>
                </Page>
            </MultiPagedFrom>
            <OverLay imgs={imgs}></OverLay>
        </>
    );
}

export default App;
