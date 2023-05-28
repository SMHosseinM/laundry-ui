import { useEffect, useState } from "react";
import styles from './styles/DayDateStyle.module.css';

interface Props {
    day: string,
    date: string,
    index: number,
    isSelected: boolean,
    onClick: (day:string, date: string, index: number) => void
}

export default function DateDate(props:Props) {

    const handleClick = () => {
        props.onClick(props.day, props.date, props.index)
    }


    return (
        <>
            <div onClick={handleClick}
                 className={`${styles.datepicker} ${props.isSelected ? styles.datepickerchosen : ''}`}
            >
                <div>{props.day}</div>
                <div>{props.date}</div>
            </div>
        </>
    )
}