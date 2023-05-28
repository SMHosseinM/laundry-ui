import Button from '@/atoms/Button';
import Time from '@/atoms/Time';
import DateDayPicker from '@/molecules/DateDayPicker';
import { useState } from 'react';
import Alert from './Alert';
import styles from './styles/ModalStyle.module.css'


interface Props{
    selecteDayAndDate: (date: string, day: string, index: number) => void,
    showCollectionDeliveryModal: () => void,
    selecteTime: (index: number) => void,
    title: string,
    serviceAvailableDates: {day: string, date: string}[],
    defaultDate: {day: string, date:string},
    defaultTime: {time: string},
    defaultDateIndex: number,
    defaultTimeIndex: number,
    confirmeDateAndTime: (selectedDate: {day: string, date: string}, selectedDateIndex: number, selectedTime: {time:string}, selectedTimeIndex: number) => void,
    times: string[]
}




export default function DateTimeModal(props:Props) {

    const [selectedDate, setSelectedDate] = useState(props.defaultDate);
    const [selectedTime, setSelectedTime] = useState(props.defaultTime)
    const [selectedDateIndex, setSelectedDateIndex] = useState(props.defaultDateIndex);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(props.defaultTimeIndex);
    const [displayWarning, setDisplayWarning] = useState(false);
    
    const handleDateDayClick = (date: string, day: string, index: number) => {
        setSelectedDate({day: day, date: date});
        setSelectedDateIndex(index);
    }

    function handleCancel() {
        props.showCollectionDeliveryModal();
        setDisplayWarning(false);
    }

    const handleConfirm = () => {
        if(selectedDate.date === '' || selectedTime.time === '') {
            setDisplayWarning(true);
            return;
        }
        props.confirmeDateAndTime(selectedDate, selectedDateIndex, selectedTime, selectedTimeIndex);
        handleCancel();
        setDisplayWarning(false);
    }

    const handleTimeClick = (selectedItemIndex: number) => {
        setSelectedTime({time: props.times[selectedItemIndex]})
        setSelectedTimeIndex(selectedItemIndex);
      }
    
    
    return (props.showCollectionDeliveryModal) ? (
        <div className={styles.modal}>
            <div className={styles.modal__content}>
                <div className={styles.modal__content__header}>
                    {props.title}
                </div>
                <hr />
                <div className={styles.modal__content__timeslot}>
                    <div className={styles.modal__content__timeslot__date}>
                        <DateDayPicker  serviceAvailableDates={props.serviceAvailableDates} onClick={handleDateDayClick} selectedIndex={selectedDateIndex}/>
                    </div>
                    <div className={styles.modal__content__timeslot__time}>
                        {props.times?.map((time:string, index:number) => {
                            return(<Time key={index} time={time} onClick={handleTimeClick} index={index} isSelected={selectedTimeIndex===index}/>)
                        })}
                    </div>
                </div>
                <hr />
                <div className={styles.modal__content__buttons}>
                    <Button name='Cancel' background_color='red' onClick={handleCancel} />
                    <Button name='Confirm' background_color='rgb(52, 107, 235)' onClick={handleConfirm}/>
                </div>
                {displayWarning ? <span className={styles.modal__content__warning}> &#9888; Please select both date and time </span> : <></>}
            </div>
        </div>
    ) : <></>;
}