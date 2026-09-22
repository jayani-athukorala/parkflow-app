package com.parkingapp.service;
import com.parkingapp.dto.ApiDtos.*; import com.parkingapp.model.Customer; import com.parkingapp.repository.CustomerRepository; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import java.util.*; import java.util.concurrent.ThreadLocalRandom;

@Service
public class CustomerService {
 private final CustomerRepository repo;
 public CustomerService(CustomerRepository repo){
  this.repo=repo;
 }

 @Transactional
 public CustomerResponse create(CreateCustomerRequest r){
  String plate=r.plateNumber().trim().toUpperCase();
  if(repo.existsByPlateNumberIgnoreCase(plate))
   throw new IllegalArgumentException("Plate number is already registered");
  String prefix=r.name().trim().replaceAll("[^A-Za-z]","").toUpperCase();
  prefix=(prefix+"XXX").substring(0,3);
  String id="CUS-"+prefix+"-"+ThreadLocalRandom.current().nextInt(100000,1000000);
  return CustomerResponse.from(
          repo.save(
                  new Customer(id,r.name().trim(),r.phone().trim(),plate)
          )
  );
 }

 @Transactional(readOnly=true)
 public List<CustomerResponse> all(){
  return repo.findAll().stream().sorted(
          Comparator.comparing(Customer::getCreatedAt).reversed()).map(CustomerResponse::from).toList();
 }
}
