package com.project.erobot.controller;

import com.project.erobot.entities.Customer;
import com.project.erobot.exception.ResourceNotFoundException;
import com.project.erobot.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/")
    public List<Customer> getAllCustomers() {

        return customerRepository.findAll();
    }
    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", "id" ,customerId));

    }
    @PostMapping("/")
    public Customer addCustomer(@Valid @RequestBody Customer customer) {

        return customerRepository.save(customer);
    }
    @PutMapping("/{customerId}")
    public Customer updateCustomer(@PathVariable Long customerId,@Valid @RequestBody Customer customer) {

        return customerRepository.findById(customerId)
                .map(cus -> {
                    cus.setFirstName(customer.getFirstName());
                    cus.setLastName(customer.getLastName());

                    return customerRepository.save(cus);
                }).orElseThrow(() -> new ResourceNotFoundException("Customer", "id" ,customerId));
    }
    @DeleteMapping("/{customerId}")
    public String deleteCustomer(@PathVariable Long customerId)  {

        return customerRepository.findById(customerId)
                .map(cat -> {
                    customerRepository.delete(cat);
                    return ("\" Customer deleted successfully \"");

                }).orElseThrow(() -> new ResourceNotFoundException("Customer", "id" ,customerId));
    }
}
