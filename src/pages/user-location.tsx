import AddressForm from "@/organisams/AddressFrom";
import { SetStateAction, useState } from "react";
import { Button, Container, Row, Col, Stack, Form } from 'react-bootstrap';
import AddresDropDown from '../molecules/AddresDropDown';

export default function Address() {
  const [val, setVal] = useState('');
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState('')

  async function finder(postcode: string) {
    console.log(postcode);
    const response = await fetch('api/address', {
      method: 'POST',
      body: JSON.stringify({ postcode}),
      headers: {
        'Content-Type': 'application/json',
        'Key': process.env.APIKEY
      }
    });
    let allAddresses = await response.json();
    setAddresses(allAddresses)
  }

  const clientAddress = (address:string|null) => {
    console.log('selected address is: ', address);
    setSelectedAddress(address!)
  }

  return (
    <>
      <Container >
        <Row className="text-center">
          <Col>Select Your Slot</Col>
        </Row>
        <Row>
          <Stack direction="horizontal" gap={3}>
            <input 
              placeholder="Enter your postcode" 
              value={val} 
              onChange={ e => {setVal(e.target.value);}}
              className="form-control"
            />
            <Button variant="secondary" onClick={()=> finder(val) }>Search</Button>
          </Stack>
        </Row>
        <Row>
          <Col>
            {addresses.length > 1 && (
              <AddresDropDown 
                addresses={addresses}
                clientAddress={clientAddress}
              />
              )
            }
          </Col>
        </Row>
        <Row>
          {selectedAddress.length > 1 && (
            <AddressForm address={selectedAddress}/>
          )}
        </Row>
      </Container>
    </>
  )
}




