package com.silvesterhasani.lufthansatestbackend.model;

import javax.persistence.*;

@Entity
@Table(name="UserVacationData")
public class UserVacationData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "noDays")
    private long days;

    public long getId() {
        return id;
    }

    public long getDays() {
        return days;
    }

    public void setDays(long days) {
        this.days = days;
    }

    public UserVacationData() {

    }

    public UserVacationData(long days) {
        super();
        this.days = days;
    }
}
