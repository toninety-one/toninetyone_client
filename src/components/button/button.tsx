import styles from "./button.module.css";
import {NextPage} from "next";

interface Props {
    button_type?: 'submit' | 'reset' | 'button' | undefined;
    button_text: string;
    button_func?: () => void;
}

const Button: NextPage<Props> = (props) => {
    const {button_func, button_type, button_text} = props;

    return (
        <button type={button_type} onClick={button_func} className={styles.button_component}>{button_text}</button>
    );
};

export default Button;