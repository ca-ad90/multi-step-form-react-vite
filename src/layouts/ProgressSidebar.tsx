import style from "./ProgressSidebar.module.scss";
interface ProgressSidebarProps {
    pages: { current: number; length: number };
    titles: string[];
    handlePageChange: (page: number) => void;
}
export default function ProgressSidebar({
    pages,
    handlePageChange,
    titles,
}: ProgressSidebarProps) {
    return (
        <>
            <div className={style["progress-sidebar"]}>
                {titles.map((title, i) => (
                    <button
                        type="button"
                        name={`Step ${i}: ${title}`}
                        aria-label={`Step ${i}: ${title}`}
                        onClick={() => handlePageChange(i)}
                        className={`${style.sidebar__steps} ${
                            pages.current == i ? style.active : ""
                        }`}
                        key={i}>
                        <div className={style.icon}>{i}</div>
                        <div className={style.text}>
                            <p className={style.step}>{`STEP ${i}`}</p>
                            <p style={{ fontWeight: 800 }}>
                                {title.toUpperCase()}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}
