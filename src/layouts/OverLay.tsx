import { useState, useRef } from "react";
import style from "./OverLay.module.scss";

export default function OverLay({ imgs }: { imgs: string[] }) {
    const overlay = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentImg, setCurrentImg] = useState<number>(0);
    function nextImg() {
        if (currentImg === imgs.length - 1) {
            setCurrentImg(0);
        } else {
            setCurrentImg(currentImg + 1);
        }
    }
    function prevImg() {
        if (currentImg === 0) {
            setCurrentImg(imgs.length - 1);
        } else {
            setCurrentImg(currentImg - 1);
        }
    }
    return (
        <>
            <div
                className={`${
                    isOpen ? style.btn_overlay_open : style.btn_overlay_close
                }`}
                onClick={() => setIsOpen(!isOpen)}>
                adsf
            </div>
            {isOpen ? (
                <div
                    className={style.overlay}
                    ref={overlay}
                    style={{ backgroundImage: `url(${imgs[currentImg]})` }}>
                    <button
                        type="button"
                        onClick={prevImg}
                        className={style.btn_img_prev}>{`<<`}</button>

                    <button
                        type="button"
                        onClick={nextImg}
                        className={style.btn_img_next}>{`>>`}</button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
