import {useEffect} from "react";

const useHeader = (title: string) => {
    useEffect(() => {
        document.title = title.length > 0 ? title + " | toninety.one" : "toninety.one"
        const header = document.getElementById("header")
        if (!header) return;
        const headerTitle = header.getElementsByClassName("header__title")
        if (headerTitle.length == 0) return;
        headerTitle[0].innerHTML = title
    })
};

export default useHeader;
