import style from "./ProgressSidebar.module.scss";
interface ProgressSidebarProps {
    currentPage: number;
    titles: string[];
    handlePageChange: (page: number) => void;
}
export default function ProgressSidebar({
    currentPage,
    handlePageChange,
    titles,
}: ProgressSidebarProps) {
    return (
        <>
            <div className={style.progressSidebar}>
                <img src="" alt="" />
                {titles.map((title, i) => (
                    <button
                        type="button"
                        name={`Step ${i + 1}: ${title}`}
                        aria-label={`Step ${i + 1}: ${title}`}
                        onClick={() => handlePageChange(i)}
                        className={`${style.sidebar__steps} ${
                            currentPage == i ? style.active : ""
                        }`}
                        key={i + 1}>
                        <div
                            className={
                                currentPage == i
                                    ? style.icon_selected
                                    : style.icon
                            }>
                            {i + 1}
                        </div>
                        <div className={style.text}>
                            <p
                                className={[
                                    currentPage == i
                                        ? "clr-light-gray"
                                        : "clr-gray",
                                    style.step,
                                ].join(" ")}>{`STEP ${i + 1}`}</p>
                            <p
                                className={"fs-sm"}
                                style={{
                                    color: "white",
                                    fontWeight: 800,
                                    letterSpacing: ".1em",
                                }}>
                                {title.toUpperCase()}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}
