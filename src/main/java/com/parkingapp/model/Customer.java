package com.parkingapp.model;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity @Table(name="customers")
public class Customer {

 @Id @Column(length=40)
 private String id;

 @Column(nullable=false,length=120)
 private String name;

 @Column(nullable=false,length=20)
 private String phone;

 @Column(name="plate_number",nullable=false,unique=true,length=20)
 private String plateNumber;

 @Column(name="created_at",nullable=false)
 private OffsetDateTime createdAt;

 protected Customer() {
 }

 public Customer(String id,String name,String phone,String plateNumber){
  this.id=id;
  this.name=name;
  this.phone=phone;
  this.plateNumber=plateNumber;
  this.createdAt=OffsetDateTime.now();
 }

 public String getId(){
  return id;
 }

 public String getName(){
  return name;
 }

 public String getPhone(){
  return phone;
 }

 public String getPlateNumber(){
  return plateNumber;
 }
 public OffsetDateTime getCreatedAt(){
  return createdAt;
 }

}
