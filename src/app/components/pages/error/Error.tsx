import "./error.scss"

const Error = ({code, text}: { code: number, text: string }) => {
    return (
        <div className={"error__container"}>
            <div className={"error__code"}>{code}</div>
            <div className={"error__text"}>{text}</div>
        </div>
    )
}

export default Error