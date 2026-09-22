package com.parkingapp.dto;
import com.parkingapp.model.*; import jakarta.validation.constraints.*; import java.time.OffsetDateTime;
public final class ApiDtos {
 private ApiDtos(){}
 public record CreateCustomerRequest(
         @NotBlank
         @Size(min=2,max=120)
         String name,
         @NotBlank
         @Pattern(regexp="\\d{10}",message="Phone must be 10 digits")
         String phone,
         @NotBlank
         @Pattern(regexp="[A-Za-z]{2,4}-\\d{3,6}",message="Plate must look like ABC-1234")
         String plateNumber){
 }

 public record CustomerResponse(
         String id,
         String name,
         String phone,
         String plateNumber,
         OffsetDateTime createdAt){
  public static CustomerResponse from(Customer c){
   return new CustomerResponse(c.getId(),c.getName(),c.getPhone(),c.getPlateNumber(),c.getCreatedAt());
  }
 }

 public record SpotResponse(
         Integer id,
         boolean available){
  public static SpotResponse from(ParkingSpot s){
   return new SpotResponse(s.getId(),s.isAvailable());
  }
 }

 public record CreateReservationRequest(
         @NotBlank
         String customerId,
         @NotNull
         Integer spotId,
         @NotNull
         @DecimalMin("0.5")
         @DecimalMax("24.0")
         Double hours){
  }

 public record ReservationResponse(
         String id,
         CustomerResponse customer,
         SpotResponse spot,
         OffsetDateTime startTime,
         OffsetDateTime scheduledEndTime,
         OffsetDateTime actualEndTime,
         ReservationStatus status){
  public static ReservationResponse from(Reservation r){
   return new ReservationResponse(r.getId(),CustomerResponse.from(
           r.getCustomer()),
           SpotResponse.from(r.getParkingSpot()),
           r.getStartTime(),
           r.getScheduledEndTime(),
           r.getActualEndTime(),
           r.getStatus()
   );
  }
 }
}
