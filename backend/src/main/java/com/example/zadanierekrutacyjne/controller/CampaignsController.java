package com.example.zadanierekrutacyjne.controller;

import com.example.zadanierekrutacyjne.domain.Campaign;

import com.example.zadanierekrutacyjne.repository.CampaignRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/campaigns")
public class CampaignsController {

    private final CampaignRepository campaignRepository;

    public CampaignsController(CampaignRepository clientRepository) {
        this.campaignRepository = clientRepository;
    }

    @GetMapping
    public List<Campaign> getClients() {
        return campaignRepository.findAll();
    }

    @GetMapping("/{id}")
    public Campaign getCampaign(@PathVariable Long id) {
        return campaignRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createCampaign(@RequestBody Campaign campaign) throws URISyntaxException {
        if (!(campaign.getCampaignName().isBlank())) {
            if (!(campaign.getKeywords().isBlank())) {
                if (campaign.getBidAmount() >= 1000) {
                    if (campaign.getCampaignFund() > 0) {
                        if (campaign.isStatus() || !(campaign.isStatus())) {
                            if (!(campaign.getTown().isBlank())) {
                                if (campaign.getRadius() > 0) {
                                    Campaign savedCampaign = campaignRepository.save(campaign);
                                    return ResponseEntity.created(new URI("/campaigns/" + savedCampaign.getId())).body(savedCampaign);
                                }
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity updateCampaign(@PathVariable Long id, @RequestBody Campaign campaign) {
        Campaign currentCampaign = campaignRepository.findById(id).orElseThrow(RuntimeException::new);

        if (!(campaign.getCampaignName().isBlank())) {
            if (!(campaign.getKeywords().isBlank())) {
                if (campaign.getBidAmount() >= 1000) {
                    if (campaign.getCampaignFund() > 0) {
                        if (campaign.isStatus() || !(campaign.isStatus())) {
                            if (!(campaign.getTown().isBlank())) {
                                if (campaign.getRadius() > 0) {
                                    currentCampaign.setCampaignName(campaign.getCampaignName());
                                    currentCampaign.setKeywords(campaign.getKeywords());
                                    currentCampaign.setBidAmount(campaign.getBidAmount());
                                    currentCampaign.setCampaignFund(campaign.getCampaignFund());
                                    currentCampaign.setStatus(campaign.isStatus());
                                    currentCampaign.setTown(campaign.getTown());
                                    currentCampaign.setRadius(campaign.getRadius());

                                    currentCampaign = campaignRepository.save(campaign);
                                    return ResponseEntity.ok(currentCampaign);
                                }
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        campaignRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}