package com.parkingapp.controller;
import com.parkingapp.dto.ApiDtos.*; import com.parkingapp.model.ReservationStatus; import com.parkingapp.service.*; import jakarta.validation.Valid; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api")
public class ParkingApiController {
 private final CustomerService customers;
 private final ParkingService parking;
 private final ReservationService reservations;

 public ParkingApiController(CustomerService c,ParkingService p,ReservationService r){
  customers=c;parking=p;reservations=r;
 }

 @GetMapping("/customers")
 List<CustomerResponse> customers(){
  return customers.all();
 }

 @PostMapping("/customers")
 @ResponseStatus(HttpStatus.CREATED)
 CustomerResponse createCustomer(@Valid @RequestBody CreateCustomerRequest r){
  return customers.create(r);
 }

 @GetMapping("/spots")
 List<SpotResponse> spots(){
  return parking.all();
 }

 @GetMapping("/reservations")
 List<ReservationResponse> reservations(@RequestParam(required=false) ReservationStatus status){
  return reservations.all(status);
 }

 @GetMapping("/reservations/{id}")
 ReservationResponse reservation(@PathVariable String id){
  return reservations.one(id);
 }

 @PostMapping("/reservations")
 @ResponseStatus(HttpStatus.CREATED)
 ReservationResponse createReservation(@Valid @RequestBody CreateReservationRequest r){
  return reservations.create(r);
 }

 @PostMapping("/reservations/{id}/checkout")
 ReservationResponse checkout(@PathVariable String id){
  return reservations.complete(id);
 }

 @PostMapping("/reservations/{id}/cancel")
 ReservationResponse cancel(@PathVariable String id){
  return reservations.cancel(id);
 }
}
