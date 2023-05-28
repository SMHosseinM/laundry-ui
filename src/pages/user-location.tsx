import Button from "@/atoms/Button";
import CollectionAndDeliveryButton from "@/molecules/CollectionAndDeliveryButtons";
import DateTimeModal from "@/organisams/DateTimeModal";
import { useEffect, useState } from "react";
import AddresDropDown from '../molecules/AddresDropDown';
import styles from './styles/UserLocation.module.css'
import getAllAddresses from '../pages/api/address'

type daysAndDates = {
  day: string,
  date: string
}

export default function Address() {
  const [val, setVal] = useState('');
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState('')
  const [dayTimeModal, setDayTimeModal] = useState(false)

  const [confirmedCollectionDate, setConfirmedCollectionDate] = useState({day: '', date: ''})
  const [confirmedDeliveryDate, setConfirmedDeliveryDate] = useState({day: '', date: ''});
  const [isCollectionClicked, setIsCollectionClicked] = useState(false);
  const [confrimedCollectionDateIndex, setConfirmedCollectionDateIndex] = useState(-1)
  const [confrimedDeliveryDateIndex, setConfirmedDeliveryDateIndex] = useState(-1)
  const [confirmedCollectionTime, setConfirmedCollectionTime] = useState({time: ''})
  const [confirmedDeliveryTime, setConfirmedDeliveryTime] = useState({time: ''})
  const [confirmedCollectionTimeIndex, setConfirmedCollectionTimeIndex] = useState(-1)
  const [confirmedDeliveryTimeIndex, setConfirmedDeliveryTimeIndex] = useState(-1)
  const [serviceAvailableDates, setServiceAvailableDates] = useState<daysAndDates[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const times = ['7:30 - 8:30', '8:30 - 9:30']

  useEffect(() => {
    const availableDates: daysAndDates[] = []
    const date = new Date();

    for (let  i=0; i<14; i++) {
        date.setDate(date.getDate() + i);
        let day = i == 0 ? 'Today' : days[date.getDay()]
        let dayDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()

        availableDates.push({day: day, date: dayDate})
    }
    setServiceAvailableDates(availableDates);
}, [])

console.log(selectedAddress)


  async function finder(postcode: string) {
    const axios = require('axios').default;

    axios({
      method: 'post',
      url: 'api/address',
      data:{
        postcode: postcode
      }
    }).then(response => {
      if(response.data.length == 0) {
        setShowErrorMessage(true);
        setErrorMessage('enter a valid postcode');
        setAddresses([]);
        return;
      }
      console.log(response.data)
      setAddresses(response.data);
      setShowErrorMessage(false);
    }, error => {
      console.log('error')
      setShowErrorMessage(true);
      setErrorMessage('postcode cannot be found');
    });
  }


  const clientAddress = (address:string|null) => {
    setShowErrorMessage(false);
    setSelectedAddress(address!)
  }


  function showDatTimeModal() {
    setDayTimeModal(!dayTimeModal);
  }

  const confirmedDateAndTime = (selectedDate: {day: string, date: string}, selectedDateIndex: number, selectedTime: {time:string}, selectedTimeIndex: number) => {
    console.log('confirmed if collection is clicked: ', isCollectionClicked);
    if (isCollectionClicked) {
      setConfirmedCollectionDate(selectedDate);
      setConfirmedCollectionDateIndex(selectedDateIndex);
      setConfirmedCollectionTime(selectedTime);
      setConfirmedCollectionTimeIndex(selectedTimeIndex);
    } else {
      setConfirmedDeliveryDate(selectedDate);
      setConfirmedDeliveryDateIndex(selectedDateIndex);
      setConfirmedDeliveryTime(selectedTime);
      setConfirmedDeliveryTimeIndex(selectedTimeIndex);
    }
    setShowErrorMessage(false);

  }

  const collectionOrDelivery = (isCollection: boolean) => {
    isCollection ? setIsCollectionClicked(true) : setIsCollectionClicked(false)
  }

  const pressEnter = (event) => {
    if (event.key === 'Enter') {
      finder(val)
    }
  }

  const handleErrorMessage = (errorMessage: string) => {
    setShowErrorMessage(true);
    setErrorMessage(errorMessage);
  } 

  const getConfirmedDate = () => isCollectionClicked ? confirmedCollectionDate : confirmedDeliveryDate;

  const getConfirmedDateIndex = () => isCollectionClicked ? confrimedCollectionDateIndex : confrimedDeliveryDateIndex; 

  const getConfirmedTime = () => isCollectionClicked ? confirmedCollectionTime : confirmedDeliveryTime;

  const getConfirmedTimeIndex = () => isCollectionClicked ? confirmedCollectionTimeIndex : confirmedDeliveryTimeIndex;

  
  return (
    <>
      <div className={styles.img}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Select Your Slot</span>
        </div>
        <div className={styles.postcode}>
            <input 
              placeholder="Enter your postcode" 
              value={val} 
              onChange={ e => setVal(e.target.value)}
              onKeyDown={e => pressEnter(e)}
              className={styles.addressSearch__input}
            />
        </div>
        {addresses.length > 0 && (<div className={styles.address}> 
            <AddresDropDown 
              addresses={addresses}
              clientAddress={clientAddress}
            />
          </div>)
        }

        <div className={styles.timeSelection}>
          <CollectionAndDeliveryButton  onClick={() => setDayTimeModal(true)} 
                                        collectionOrDelivery={collectionOrDelivery}
                                        collectionDate={confirmedCollectionDate}
                                        collectionTime={confirmedCollectionTime}
                                        deliveryDate={confirmedDeliveryDate}
                                        deliveryTime={confirmedDeliveryTime}
                                        isAddressSelected={selectedAddress ? true : false}
                                        errorMessage={handleErrorMessage}
          />
        </div>
        {dayTimeModal ? (<DateTimeModal showCollectionDeliveryModal={showDatTimeModal} 
                                defaultDate={getConfirmedDate()}
                                defaultDateIndex={getConfirmedDateIndex()}
                                defaultTime={getConfirmedTime()}
                                defaultTimeIndex={getConfirmedTimeIndex()}
                                times={times}
                                serviceAvailableDates={serviceAvailableDates}
                                confirmeDateAndTime={confirmedDateAndTime}
                                title={"Choose the collection time slot"} />) : <></>
        }
        <div className={styles.nextButton}>
          <Button name={'next'} background_color={'blue'} width={'100%'}></Button>
        </div>
        {showErrorMessage ? <span className={styles.modal__content__warning}> &#9888; Please {errorMessage} </span> : <></>}

      
      </div>

    </>
  )
}




