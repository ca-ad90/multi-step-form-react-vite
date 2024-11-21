import "./App.scss";
import MultiPagedFrom from "./layouts/MultiPageForm";
import { Input } from "./components/Input";
import { CheckBox } from "./components/CheckBox";
import Page from "./layouts/Page";

import OverLay from "./layouts/OverLay";
import { Radiobutton } from "./components/Radiobutton";

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
                </Page>
                <Page title="Second Page" text="this is the first page">
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%",
                        }}>
                        <Radiobutton
                            name="addon"
                            label="Online Access"
                            price="+1$"
                            value="1"
                            icon="../src/assets/images/icon-arcade.svg"
                            checked={false}></Radiobutton>
                        <Radiobutton
                            name="addon"
                            label="Online Access"
                            price="+2$"
                            value="2"
                            icon="../src/assets/images/icon-arcade.svg"
                            checked={false}></Radiobutton>
                        <Radiobutton
                            name="addon"
                            label="Online Access"
                            price="+2$"
                            value="2"
                            icon="../src/assets/images/icon-arcade.svg"
                            checked={false}></Radiobutton>
                    </div>
                </Page>
            </MultiPagedFrom>
            <OverLay imgs={imgs}></OverLay>
        </>
    );
}

export default App;
