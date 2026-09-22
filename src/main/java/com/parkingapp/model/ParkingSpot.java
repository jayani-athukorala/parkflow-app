package com.parkingapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "parking_spots")
public class ParkingSpot {

 @Id
 private Integer id;

 @Column(nullable = false)
 private boolean available = true;

 protected ParkingSpot() {
 }

 public ParkingSpot(Integer id, boolean available) {
  this.id = id;
  this.available = available;
 }

 public Integer getId() {
  return id;
 }

 public boolean isAvailable() {
  return available;
 }

 public void occupy() {
  if (!available) {
   throw new IllegalStateException(
           "Parking spot is already occupied"
   );
  }

  this.available = false;
 }

 public void vacate() {
  this.available = true;
 }
}