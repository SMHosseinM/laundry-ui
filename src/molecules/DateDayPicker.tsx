import DateDate from "@/atoms/DayDate";
import { useEffect, useState } from "react";
import styles from './styles/DatePickerStyle.module.css'

interface Props {
    serviceAvailableDates: {day: string, date: string}[],
    selectedIndex: number,
    onClick: (day: string, date: string, index: number) => void

}

export default function DateDayPicker(props: Props) {

    const handleClick = (date: string, day: string, index: number) => {
        props.onClick(day, date, index);
    }

    return(
        <>
            {props.serviceAvailableDates?.map((dateDay, index) => {
                return(
                    <DateDate key={index} 
                              date={dateDay.date} 
                              day={dateDay.day} 
                              onClick={handleClick} 
                              index={index} 
                              isSelected={props.selectedIndex===index}/> 
                )
            }) ?? ""}
        </>
    )

}