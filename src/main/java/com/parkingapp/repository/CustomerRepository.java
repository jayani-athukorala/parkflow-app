package com.parkingapp.repository;
import com.parkingapp.model.Customer; import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,String>{
    boolean existsByPlateNumberIgnoreCase(String plateNumber);
}
