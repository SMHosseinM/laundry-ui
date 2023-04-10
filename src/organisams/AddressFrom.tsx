import FormInput from '@/molecules/FormInput';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addressFormProps } from './types/addressFormProps';
import styles from './styles/AddressForm.module.css';

export default function AddressForm(props: addressFormProps) {
  const selectedAddress = JSON.parse(props.address);
  console.log('json', selectedAddress);
  return (
    <Form validated> 
      <FormInput 
        label="Address Line 1"
        type="text"
        value={selectedAddress.addressLine1}
        controlId="addressLineOne"
      />
      <FormInput 
        label="Address Line 2 (optional)"
        type="text"
        value={selectedAddress.addressLine2}
        required={false}
        controlId="addressLineTwo"
      />
      <FormInput 
        label="City"
        type="text"
        value={selectedAddress.town.charAt(0)
          + selectedAddress.town.slice(1).toLowerCase()}
        controlId="city"
      />
      <FormInput 
        label="postCode"
        type="text"
        value={selectedAddress.postCode}
        controlId="postCode"
      />
      <div className={styles.submitButton}>
      <Button 
        variant="primary" 
        type="submit" 

      >
        Submit
      </Button>
      </div>
    </Form>
  );
}