package com.example.zadanierekrutacyjne.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "campaign")
public class Campaign {

    @Id
    @GeneratedValue
    private Long id;
    private String campaignName;
    private String keywords;
    private int bidAmount;
    private int campaignFund;
    private boolean status;
    private String town;
    private int radius;

}