package com.parkingapp.repository;
import com.parkingapp.model.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,String>{
    List<Reservation> findAllByOrderByStartTimeDesc();
    List<Reservation> findByStatusOrderByStartTimeDesc(ReservationStatus status);
}
