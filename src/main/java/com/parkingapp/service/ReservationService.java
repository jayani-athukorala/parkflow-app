package com.parkingapp.service;
import com.parkingapp.dto.ApiDtos.*; import com.parkingapp.model.*; import com.parkingapp.repository.*; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import java.time.OffsetDateTime; import java.util.*; import java.util.concurrent.ThreadLocalRandom;

@Service
public class ReservationService {
 private final ReservationRepository reservations;
 private final CustomerRepository customers;
 private final ParkingSpotRepository spots;

 public ReservationService(ReservationRepository r,CustomerRepository c,ParkingSpotRepository s){
  reservations=r;customers=c;spots=s;
 }

 @Transactional
 public ReservationResponse create(CreateReservationRequest req){
  Customer c=customers.findById(
          req.customerId()).orElseThrow(()->new NoSuchElementException("Customer not found"));
  ParkingSpot s=spots.findByIdForUpdate(req.spotId()).orElseThrow(
          ()->new NoSuchElementException("Parking spot not found"));
  if(!s.isAvailable()) throw new IllegalStateException("Parking spot is already occupied");
  s.occupy(); OffsetDateTime start=OffsetDateTime.now();
  long minutes=Math.round(req.hours()*60);
  String id="RES-"+start.toLocalDate().toString().replace("-","")+"-"+ThreadLocalRandom.current().nextInt(100000,1000000);
  return ReservationResponse.from(reservations.save(new Reservation(id,c,s,start,start.plusMinutes(minutes))));
 }
 @Transactional(readOnly=true)
 public List<ReservationResponse> all(ReservationStatus status){
  List<Reservation> data=status==null?reservations.findAllByOrderByStartTimeDesc():reservations.findByStatusOrderByStartTimeDesc(status);
  return data.stream().map(ReservationResponse::from).toList();
 }

 @Transactional(readOnly=true)
 public ReservationResponse one(String id){
  return ReservationResponse.from(reservations.findById(id).orElseThrow(()->new NoSuchElementException("Reservation not found")));
 }

 @Transactional
 public ReservationResponse complete(String id){
  Reservation r=reservations.findById(id).orElseThrow(()->new NoSuchElementException("Reservation not found")); r.complete();
  return ReservationResponse.from(r);
 }

 @Transactional
 public ReservationResponse cancel(String id){
  Reservation r=reservations.findById(id).orElseThrow(
          ()->new NoSuchElementException("Reservation not found")); r.cancel();
          return ReservationResponse.from(r);
 }
}
