import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { AddressDropDownProps } from './types/AddressDropDownProps';



export default function AddressDropDown(props: AddressDropDownProps){

  let change = (eventkey:string|null) => {
    {props.clientAddress(eventkey!)};
  };

  const fetchedAddresses = props.addresses?.map((item, index) => {
    const envelopeAddress = item.envelopeAddress;
    let fullAddress = envelopeAddress.addressLine1;
    if(envelopeAddress.addressLine2) {
      fullAddress += ", " + envelopeAddress.addressLine2;
    }
    fullAddress += ", " + envelopeAddress.postCode;

    return (
      <Dropdown.Item 
        key={index} 
        eventKey={JSON.stringify(envelopeAddress)}
      >
        {fullAddress}
      </Dropdown.Item>
    );
})
  return (
    <Dropdown onSelect={change}>
      <Dropdown.Toggle
        className='mt-2 mb-2 dropdown'>Choose Your Address</Dropdown.Toggle>
      <Dropdown.Menu
       className='dropdown'>
        {fetchedAddresses}
      </Dropdown.Menu>
    </Dropdown>
  )
}