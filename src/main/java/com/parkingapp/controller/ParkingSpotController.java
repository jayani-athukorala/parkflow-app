package com.parkingapp.controller;

import com.parkingapp.model.ParkingSpot;
import com.parkingapp.repository.ParkingSpotRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parking-spots")
public class ParkingSpotController {

    private final ParkingSpotRepository parkingSpotRepository;

    public ParkingSpotController(
            ParkingSpotRepository parkingSpotRepository
    ) {
        this.parkingSpotRepository = parkingSpotRepository;
    }

    @GetMapping
    public List<ParkingSpot> getAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }
}
