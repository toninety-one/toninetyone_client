type FileProp = {
    text: string,
    filePath: string
}

type Props = {
    title: string,
    type?: "text" | FileProp
}


const DetailsProperty = ({title, type}: Props) => {

    let text = ""
    console.log("type")
    console.log(type)
    console.log("output")
    if (!type) {
        console.log("not type")
        text = "nn"
    } else if ((type as "text").length !== undefined) {
        console.log("string")
        text = "st"
    } else if ((type as FileProp).filePath !== undefined) {
        console.log('file')
        text = "fl"
    }

    return (
        <div>
            {title} - {text}
        </div>
    )
}

export default DetailsProperty;