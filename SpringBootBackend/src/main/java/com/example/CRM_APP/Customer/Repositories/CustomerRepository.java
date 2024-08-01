package com.example.CRM_APP.Customer.Repositories;

import com.example.CRM_APP.Customer.Models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    List<Customer> findByFirstName(String firstName);

    List<Customer> findByLastName(String lastName);

    @Query("SELECT c FROM Customer c WHERE c.email LIKE %:keyword%")
    List<Customer> searchByEmail(@Param("keyword") String keyword);

    List<Customer> findByLastNameOrFirstName(String lastName, String firstName);

    boolean existsByEmail(String email);

}
