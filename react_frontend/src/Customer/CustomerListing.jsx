import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import CustomerModal from "./CustomerModal";

const CustomerListing = () => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState(false);

    const fetchData = async () =>{
        const response = await axios.get("customers");
        setCustomers(response.data)
    }

    const removeCustomer = async (id) => {
        try{
            const response = await axios.delete(`customers/${id}`, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            });
            if(response.status == 204){
                setCustomers(prevCustomers => prevCustomers.filter(prevCustomer => prevCustomer.id !== id));
                fetchData();
            } else{
                console.log(`Failed to delete the customer: ${response.statusText}`)
            }
        }catch(error){
            if(error.response){
                console.error(`Error response: ${error.response.data}`);
            }
        }
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleEditClick = (customer) =>{
        setSelectedCustomer(customer);
        setNewCustomer(false);
        toggleModal();
    }

    const handleSaveCustomer = async (customer) =>{
        try{
            let response;
            if(customer.id){
                response = await axios.put(`customers/${customer.id}`, customer,{
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
            }else{
                response = await axios.post(`customers`, [customer],{
                    headers:{
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }
                })
            }
            if(response.status === 200){
                setCustomers(customers.map(customer => customer.id === customer.id ? customer : customer))
                fetchData();
            }else if(response.status === 201){
                setCustomers(...customers, response.data)
                fetchData();
            }else{
                console.log(`Failed to update customer details: ${response.statusText}`)
            }
        }catch(error){
            if(error.message){
                console.error(`Error response: ${error.response.data}`)
            }
        }
    }

    const handleNewCustomer = async () =>{
        setSelectedCustomer({firstName:"", lastName:"", email:""})
        setNewCustomer(true);
        toggleModal()
    }

    const listing = () => {
        return(
            <Table bordered dark hover responsive striped>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && (customers.map(customer=>(
                        <tr key={customer.id}>
                            <th scope="row">{customer.id}</th>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>
                                <ButtonGroup>
                                    <Button color="primary" outline size="sm" onClick={() => handleEditClick(customer)}>
                                        Edit
                                    </Button>
                                    <Button color="danger" outline size="sm" onClick={()=> removeCustomer(customer.id)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </Table>
        )
    }

    useEffect(() => {
        fetchData();
    }, []);
    return(
        <>
        <Container fluid>
            <div className="float-end">
                <Button color="success" onClick={handleNewCustomer}>Add new customer</Button>
            </div>
            <h3>Customers</h3>
            {listing()}
            <CustomerModal isOpen={modalOpen} newCustomer={newCustomer} customer={selectedCustomer} toggle={toggleModal} handleSave={handleSaveCustomer}/>
        </Container>
        </>
    )
};

export default CustomerListing;