package com.parkingapp.service;
import com.parkingapp.dto.ApiDtos.SpotResponse; import com.parkingapp.repository.ParkingSpotRepository; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import java.util.List;

@Service
public class ParkingService {
    private final ParkingSpotRepository repo;

    public ParkingService(ParkingSpotRepository repo){
        this.repo=repo;
    }

    @Transactional(readOnly=true)
    public List<SpotResponse> all(){
        return repo.findAllByOrderByIdAsc().stream().map(SpotResponse::from).toList();
    }
}
