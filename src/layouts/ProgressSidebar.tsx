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
            <div className={style.progressSidebar}>
                {titles.map((title, i) => (
                    <button
                        type="button"
                        name={`Step ${i + 1}: ${title}`}
                        aria-label={`Step ${i + 1}: ${title}`}
                        onClick={() => handlePageChange(i)}
                        className={`${style.sidebar__steps} ${
                            pages.current == i ? style.active : ""
                        }`}
                        key={i + 1}>
                        <div className={style.icon}>{i + 1}</div>
                        <div className={style.text}>
                            <p className={style.step}>{`STEP ${i + 1}`}</p>
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
