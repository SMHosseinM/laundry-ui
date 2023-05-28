import styles from './styles/CollectionAndDeliveryButtons.module.css'

interface Props {
    onClick: () => void
    collectionDate: {day: string, date: string},
    collectionTime: {time: string}
    deliveryDate:{day: string, date: string},
    collectionOrDelivery: (isCollection: boolean) => void 
    deliveryTime: {time: string},
    isAddressSelected: boolean,
    errorMessage: (input: string) => void
}

export default function CollectionAndDeliveryButton(props: Props) {

    const collection = (isCollection: boolean) => {
        if(!props.isAddressSelected) {
            props.errorMessage('Please enter your postcode and select your address')
            return;
        }
        else if(!isCollection && !props.collectionDate.day) {
            props.errorMessage('Please select your collection date')
            return;
        } 
        props.collectionOrDelivery(isCollection)
        props.onClick()
    }

    const collectionDayAndDateRepresentation = (collectionDate: {day: string, date: string}, collectionTime: {time: string}) => {
        return `Collection Time \n${collectionDate.day} ${collectionDate.date}  at ${collectionTime.time}`
    }

    const deliveryDayAndDateRepresentation = (deliveryDate: {day: string, date: string}, deliveryTime: {time: string}) => {
        return `Delivery Time \n${deliveryDate.day} ${deliveryDate.date} at ${deliveryTime.time}`
    }

    return(
        <>
            <input  
                type='button'
                value={props.collectionDate.day=='' ? 'Collection Date & Time': collectionDayAndDateRepresentation(props.collectionDate, props.collectionTime)}
                onClick={() => collection(true)}
                className={styles.button}
            />
            <input
                type='button'
                value={props.deliveryDate.day=='' ? 'Delivery Date & Time': deliveryDayAndDateRepresentation(props.deliveryDate, props.deliveryTime)}
                onClick={() => collection(false)}
                className={styles.button}
            />
        </>
    )
}