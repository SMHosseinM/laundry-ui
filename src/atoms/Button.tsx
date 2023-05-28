interface Props {
    name: string,
    background_color: string,
    onClick: () => void,
    width?: string
}

import styles from './styles/ButtonStyle.module.css'


export default function Button(props: Props) {

    const defaultWidth = 'auto';

    const disabled = ():boolean => {
        return true;
    }

    return (
        <>
            <button onClick={() => props.onClick()} 
                    className={styles.btn}
                    style={{backgroundColor: props.background_color, width: props.width ? props.width : defaultWidth}}
                    disabled={false}
            >
                {props.name}
            </button>
        </>
    )
} 