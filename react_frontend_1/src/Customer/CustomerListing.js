import axios from "axios";
import { useState } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import EditCustomerModal from "./EditCustomer";
import NavBar from "../NavBar/NavBar";

const CustomerListing = () => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const removeCustomer = async (id) => {
        try{
            const response = await axios.delete(`customers/${id}`, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            });
            if(response.status == 200){
                setCustomers(prevCustomers => prevCustomers.filter(prevCustomer => prevCustomer.id !== id));
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
        toggleModal()
    }

    const handleSaveCustomer = async (updatedCustomer) =>{
        try{
            const response = await axios.put(`customers/${updatedCustomer.id}`, updatedCustomer,{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            if(response.status === 200){
                setCustomers(customers.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer))
            }else{
                console.log(`Failed to update customer details: ${response.statusText}`)
            }
        }catch(error){
            if(error.message){
                console.error(`Error response: ${error.response.data}`)
            }
        }
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
                    {customers.length > 0 ? (customers.map(customer=>(
                        <tr key={customer.id}>
                            <th scope="row">{customer.id}</th>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>
                                <ButtonGroup>
                                    <Button color="primary" outline size="sm" onClick={handleEditClick(customer)}>
                                        Edit
                                    </Button>
                                    <Button color="danger" outline size="sm" onClick={()=> removeCustomer(customer.id)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))):(<p>No customers found</p>)}
                </tbody>
            </Table>
        )
    }

    useEffect(() => {
        const fetchData = async () =>{
            const response = await axios.get("customers").data;
            setCustomers(response)
        }
        fetchData();
    }, []);
    return(
        <>
        <NavBar/>
        <h2>Customers</h2>
        <Container fluid>
            <div className="float-end">
                <Button color="success">Add new customer</Button>
            </div>
            <h3>Customers</h3>
            {listing}
            <EditCustomerModal isOpen={modalOpen} toggle={toggleModal} customer={selectedCustomer} handleSave={handleSaveCustomer}/>
        </Container>
        </>
    )
};

export default CustomerListing;