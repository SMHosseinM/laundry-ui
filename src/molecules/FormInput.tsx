import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FormInputVal } from "./types/FormInputVal";

export default function FormInput(props: FormInputVal) {
  let {label, type, value, controlId, required} = props;
  const [inputData, setInputData] = useState('')

  useEffect(() => {
    setInputData(value)
  }, [value])


  return (
    <Form.Group className="mb-3" controlId={ controlId }>
      {label && <Form.Label>{ label }</Form.Label>}
      <Form.Control 
        required={required}
        type={ type } 
        value={inputData} 
        onChange={(event) => setInputData(event.target.value)}/>
    </Form.Group>
  )
}

FormInput.defaultProps = {
  required: true
}  

