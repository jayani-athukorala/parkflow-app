package com.parkingapp.repository;
import com.parkingapp.model.ParkingSpot; import org.springframework.data.jpa.repository.*; import jakarta.persistence.LockModeType; import java.util.*;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot,Integer>{
    List<ParkingSpot> findAllByOrderByIdAsc();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from ParkingSpot p where p.id=:id")
    Optional<ParkingSpot> findByIdForUpdate(Integer id);
}
