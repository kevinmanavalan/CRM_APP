package com.example.CRM_APP.Customer.Services;

import com.example.CRM_APP.Customer.Models.Customer;
import com.example.CRM_APP.Customer.Repositories.CustomerRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.nio.file.FileAlreadyExistsException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CustomerServices {

    private static final Logger logger = LogManager.getLogger(CustomerServices.class);
    private final CustomerRepository customerRepository;

    public CustomerServices(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    public List<Customer> findByName(String name) {
        return customerRepository.findByLastNameOrFirstName(name, name);
    }

    public Customer addCustomer(Customer customer) throws FileAlreadyExistsException {
        if (!customerRepository.existsByEmail(customer.getEmail())) {
            try {
                return customerRepository.save(customer);
            } catch (Exception e) {
                throw new RuntimeException("Customer could not be added");
            }
        } else {
            throw new FileAlreadyExistsException("Customer already exists in records");
        }
    }

    public Customer saveCustomer(Customer customer) {
        try {
            return customerRepository.save(customer);
        } catch (Exception e) {
            logger.error("Customer could not be saved to records due to an error:{}", e.getMessage());
            throw new RuntimeException("Customer could not be saved to records", e);
        }
    }

    public void deleteCustomer(Long id) {
        if(customerRepository.existsById(id)) {
            try {
                customerRepository.deleteById(id);
                logger.info("Deleted Customer with id {}", id);
            } catch (Exception e) {
                logger.error("Delete failed:Customer with id: {} could not be deleted due to an error:{}", id, e.getMessage());
                throw new RuntimeException("Customer with id " + id + "could not be deleted.", e);
            }
        }else{
            logger.error("Delete failed:Customer with id: {} not found", id);
            throw new NoSuchElementException("No such Customer with id " + id);
        }

    }

    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> {
            logger.error("Update failed:Customer with id: {} not found", id);
            return new NoSuchElementException("No such Customer with id " + id);
        });
        try {
            if (customerDetails.getFirstName() != null)
                customer.setFirstName(customerDetails.getFirstName());
            if (customerDetails.getLastName() != null)
                customer.setLastName(customerDetails.getLastName());
            if (customerDetails.getEmail() != null)
                customer.setEmail(customerDetails.getEmail());
            logger.info("Updated details of Customer with id {}", id);
            return customerRepository.save(customer);
        } catch (Exception e) {
            logger.error("Update failed:Customer with id: {} could not be updated due to an error: {}", id, e.getMessage());
            throw new RuntimeException("Customer with id " + id + "could not be updated.", e);
        }

    }

    public long customerCount() {
        return customerRepository.count();
    }
}
