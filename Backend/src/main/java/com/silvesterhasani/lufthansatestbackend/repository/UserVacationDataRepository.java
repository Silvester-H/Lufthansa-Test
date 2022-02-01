package com.silvesterhasani.lufthansatestbackend.repository;


import com.silvesterhasani.lufthansatestbackend.model.UserVacationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVacationDataRepository extends JpaRepository<UserVacationData, Long> {
}
