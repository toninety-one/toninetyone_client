import styles from "./notEnoughItems.module.scss"

const NotEnoughItems = ({title}: { title: string }) => {
    return (
        <h1 className={styles.notEnoughItems__container}>
            {title}
        </h1>
    )
}
export default NotEnoughItems;