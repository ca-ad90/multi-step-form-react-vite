import "./App.scss";
import MultiPagedFrom from "./layouts/MultiPageForm";
import { Input } from "./components/Input";
import Page from "./layouts/Page";
import { FormContext } from "./formContext";
import { useFormHook } from "./hooks/useFromHook";
import OverLay from "./layouts/OverLay";
import { Radiobutton } from "./components/Radiobutton";
import { SwitchButton } from "./components/SwitchBtn";

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
    const { handleChange, state } = useFormHook(FormContext);
    const [form, setForm] = state;
    return (
        <>
            <FormContext.Provider value={{ form, setForm }}>
                <MultiPagedFrom>
                    <Page title="First Page" text="this is the first page">
                        <Input
                            type="text"
                            required
                            label="Name"
                            name="name"
                            handleChange={handleChange}></Input>
                        <Input
                            name="email"
                            required
                            type="email"
                            label="Email"
                            handleChange={handleChange}></Input>
                        <Input
                            name="phone"
                            type="phone"
                            label="Phone Number"
                            handleChange={handleChange}></Input>
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
                                price={[10, 100]}
                                icon="../src/assets/images/icon-arcade.svg"
                                form={form}
                                handleChange={handleChange}></Radiobutton>

                            <Radiobutton
                                name="addon"
                                label="Online Access"
                                price={[15, 150]}
                                icon="../src/assets/images/icon-arcade.svg"
                                form={form}
                                handleChange={handleChange}></Radiobutton>

                            <Radiobutton
                                name="addon"
                                label="Online Access"
                                price={[20, 200]}
                                icon="../src/assets/images/icon-arcade.svg"
                                form={form}
                                handleChange={handleChange}></Radiobutton>
                        </div>
                        <SwitchButton
                            options={["Monthly", "Yearly"]}
                            name="period"
                            form={form}
                            handleChange={handleChange}
                        />
                    </Page>
                    <Page title="Third Page" text="this is the first page">
                        <div></div>
                    </Page>
                </MultiPagedFrom>
                <OverLay imgs={imgs}></OverLay>{" "}
            </FormContext.Provider>
        </>
    );
}

export default App;
