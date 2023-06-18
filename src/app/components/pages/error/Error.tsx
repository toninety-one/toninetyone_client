import styles from "./error.module.scss"
import useHeader from "../../../hooks/useHeader.ts";

const Error = ({code, text}: { code: number, text: string }) => {
    useHeader("Страница не найдена")

    return (
        <div className={styles.error__container}>
            <div className={styles.error__code}>{code}</div>
            <div className={styles.error__text}>{text}</div>
        </div>
    )
}

export default Error