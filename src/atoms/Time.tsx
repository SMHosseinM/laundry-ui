import styles from './styles/Time.module.css'


interface Props {
    time: string,
    isSelected: boolean,
    index: number,
    onClick: (index: number) => void
}


export default function Time(props: Props) {

    const handleClick = () => {
        props.onClick(props.index);
    }
    return(
        <>
            <div onClick={handleClick}
                 className={`${styles.availabletimes} ${props.isSelected ? styles.timechosen : ''}`} 
            >
                {props.time}
            </div>
        </>
    )
}