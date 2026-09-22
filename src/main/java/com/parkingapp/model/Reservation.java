package com.parkingapp.model;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity @Table(name="reservations")
public class Reservation {

 @Id @Column(length=40)
 private String id;

 @ManyToOne(optional=false,fetch=FetchType.LAZY)
 @JoinColumn(name="customer_id")
 private Customer customer;

 @ManyToOne(optional=false,fetch=FetchType.LAZY)
 @JoinColumn(name="spot_id")
 private ParkingSpot parkingSpot;

 @Column(name="start_time",nullable=false)
 private OffsetDateTime startTime;

 @Column(name="scheduled_end_time",nullable=false)
 private OffsetDateTime scheduledEndTime;

 @Column(name="actual_end_time")
 private OffsetDateTime actualEndTime;

 @Enumerated(EnumType.STRING)
 @Column(nullable=false,length=20)
 private ReservationStatus status;

 protected Reservation(){}

 public Reservation(String id,Customer customer,ParkingSpot parkingSpot,OffsetDateTime startTime,OffsetDateTime scheduledEndTime){
  this.id=id;
  this.customer=customer;
  this.parkingSpot=parkingSpot;
  this.startTime=startTime;
  this.scheduledEndTime=scheduledEndTime;
  this.status=ReservationStatus.ACTIVE;
 }

 public void complete(){
  if(status!=ReservationStatus.ACTIVE)
   throw new IllegalStateException("Reservation is not active");
  status=ReservationStatus.COMPLETED;
  actualEndTime=OffsetDateTime.now();
  parkingSpot.vacate();}

 public void cancel(){
  if(status!=ReservationStatus.ACTIVE)
   throw new IllegalStateException("Reservation is not active");
  status=ReservationStatus.CANCELLED;
  actualEndTime=OffsetDateTime.now();
  parkingSpot.vacate();
 }
 public String getId(){
  return id;
 }

 public Customer getCustomer(){
  return customer;
 }

 public ParkingSpot getParkingSpot(){
  return parkingSpot;
 }

 public OffsetDateTime getStartTime(){
  return startTime;
 }

 public OffsetDateTime getScheduledEndTime(){
  return scheduledEndTime;
 }

 public OffsetDateTime getActualEndTime(){
  return actualEndTime;
 }

 public ReservationStatus getStatus(){
  return status;
 }
}
