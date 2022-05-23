package com.example.zadanierekrutacyjne.repository;

import com.example.zadanierekrutacyjne.domain.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}