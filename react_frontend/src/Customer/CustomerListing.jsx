import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Input, Table } from "reactstrap";
import CustomerModal from "./CustomerModal";
import { ClimbingBoxLoader } from "react-spinners";

const CustomerListing = () => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filterKey, setFilterKey] = useState('');

    const fetchData = async () =>{
        try{
            const response = await axios.get("customers");
            setCustomers(response.data)
        }catch(error){
            console.log("error fetching customer data", error.message);
        }finally{
            setLoading(false);
        }
        
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
    const filteredData = (customers, filterKey) =>{
        return customers.filter(customer => Object.values(customer).some(fields => (""+fields).toLowerCase().includes(filterKey)));
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
                    {customers && (filteredData(customers, filterKey).map(customer=>(
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
        <div className="d-flex flex-column" style={{ height: 'calc(100vh - 56px)' }}>
            <div>
                <Container fluid>
                    <div className="float-end">
                        <div className="float-start">
                            <Input type="text" placeholder="Search..." value={filterKey} onChange={e => setFilterKey(e.target.value)} />
                        </div>
                        <Button color="success" onClick={handleNewCustomer}>Add new customer</Button>
                    </div>
                    <h3>Customers</h3>
                    {!loading && listing()}
                    <CustomerModal isOpen={modalOpen} newCustomer={newCustomer} customer={selectedCustomer} toggle={toggleModal} handleSave={handleSaveCustomer}/>
                </Container>
            </div>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <ClimbingBoxLoader color="fuchsia" loading={loading} size={50}/>
            </div>
        </div>
        </>
    )
};

export default CustomerListing;