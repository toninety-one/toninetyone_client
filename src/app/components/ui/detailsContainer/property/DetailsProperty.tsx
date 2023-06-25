import styles from "./detailsProperty.module.scss";

type Props = {
    text: string,
    data: string,
}

const DetailsProperty = ({text, data}: Props) => {

    return (
        <tr className={styles.details__container}>
            <td className={styles.details__text}>
                {text}
            </td>
            <td className={styles.details__data}>
                {data}
            </td>
        </tr>
    )
}

export default DetailsProperty;