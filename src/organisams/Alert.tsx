import Button from "@/atoms/Button";
import { useState } from "react";

import style from './styles/AlertStyle.module.css'

interface Props {
    showAlert: boolean
}
console.log('alert')
export default function Alert(props: Props) {

    const [displayed, setDisplayed] = useState(props.showAlert)

    return (
        <div className={style.alert}>
            <text>hellp</text>
            <Button name={"OK"} background_color={"blue"} onClick={() => setDisplayed(false)}></Button>
        </div>
    )
}