import "./button.scss";

interface Props {
    button_type?: 'submit' | 'reset' | 'button' | undefined;
    button_text: string;
    button_func?: (any: unknown) => void;
}

const Button = (props: Props) => {
    const {button_func, button_type, button_text} = props;

    return (
        <button type={button_type} onClick={button_func} className={"button_component"}>{button_text}</button>
    );
};

export default Button;