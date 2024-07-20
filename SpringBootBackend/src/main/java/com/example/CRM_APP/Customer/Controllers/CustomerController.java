package com.example.CRM_APP.Customer.Controllers;

import com.example.CRM_APP.Customer.Models.Customer;
import com.example.CRM_APP.Customer.Services.CustomerServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.FileAlreadyExistsException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("customers")
public class CustomerController {

    private final CustomerServices customerServices;

    public CustomerController(CustomerServices customerServices){
        this.customerServices = customerServices;
    }

    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerServices.getAllCustomers();
    }

    @PostMapping
    public ResponseEntity<Customer> addNewCustomer(@RequestBody Customer customer){
        try{
            return ResponseEntity.ok(customerServices.addCustomer(customer));
        }catch (FileAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("save")
    public Customer saveCustomer(@RequestBody Customer customer){
        return customerServices.saveCustomer(customer);
    }

    @PutMapping("{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails){
        try{
            Customer updatedCustomer = customerServices.updateCustomer(id, customerDetails);
            return ResponseEntity.ok(updatedCustomer);
        }
        catch(NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Customer> deleteCustomer(@PathVariable Long id){
        try{
            customerServices.deleteCustomer(id);
            return ResponseEntity.noContent().build();
        }catch(NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
