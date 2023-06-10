import "./error.scss"
import useHeader from "../../../hooks/useHeader.ts";

const Error = ({code, text}: { code: number, text: string }) => {
    useHeader("Страница не найдена")

    return (
        <div className={"error__container"}>
            <div className={"error__code"}>{code}</div>
            <div className={"error__text"}>{text}</div>
        </div>
    )
}

export default Error