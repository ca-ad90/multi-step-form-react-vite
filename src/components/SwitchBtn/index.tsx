import styles from "./switchBtn.module.scss";
export function SwitchButton() {
    return (
        <div className={styles.container}>
            <label className={styles.alt1}>
                Alter1
                <input type="radio" name="switch" value="0" />
            </label>
            <div className={styles.switch}>
                <div className={styles.ball}></div>
            </div>
            <label className={styles.alt2}>
                Alternative2
                <input type="radio" name="switch" value="1" />
            </label>
        </div>
    );
}
