import { useState, useEffect } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const CustomerModal = ({isOpen, newCustomer, customer, toggle, handleSave}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSaveClick = () =>{
        const updatedCustomer = {...customer, firstName, lastName, email};
        handleSave(updatedCustomer)
        toggle()
    }

    useEffect(() => {
        if (customer) {
            setFirstName(customer.firstName);
            setLastName(customer.lastName);
            setEmail(customer.email);
        }
    }, [customer]);

    return(
        <Modal isOpen={isOpen}>
            <ModalHeader toggle={toggle}>{newCustomer ? "New Customer" : "Edit Customer"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input id="firstName" value={firstName} placeholder={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input id="lastName" value={lastName} placeholder={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" value={email} placeholder={email} onChange={(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveClick}>Save changes</Button>
                {' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CustomerModal;