import React, { useState } from 'react';
import { AddressDropDownProps } from './types/AddressDropDownProps';
import { EnvelopeAddress } from './types/EnvelopeAddress';
import styles from './styles/AddressDropDown.module.css';



export default function AddressDropDown(props: AddressDropDownProps){

  const dropdown_title = ' -- select your address -- ';

  let change = (event:{}) => {
    {props.clientAddress(event?.target?.value)};
  };

  function formatAddress(envelopeAddress: EnvelopeAddress) {
    let fullAddress = envelopeAddress.addressLine1;
    if(envelopeAddress.addressLine2) {
      fullAddress += ", " + envelopeAddress.addressLine2;
    }
    fullAddress += ", " + envelopeAddress.postCode;

    return fullAddress;
  }

  console.log('addresses are: ', props.addresses)
  return (
    <form>
    <select name='address' className={styles.addressDropDownItem} onChange={change} defaultValue='default'>
      <option disabled value='default'> -- select your address -- </option>
       {props.addresses?.map((item, index) => {
          const address = formatAddress(item.envelopeAddress);

          return (
            <option 
              key={index} 
              value={address}
              className={styles.addressDropDownItem}
            >
              {address}
            </option>
          );
        })}
    </select>
    </form>
  )
}