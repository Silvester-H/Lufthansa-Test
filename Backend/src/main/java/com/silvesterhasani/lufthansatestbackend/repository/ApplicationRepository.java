package com.silvesterhasani.lufthansatestbackend.repository;

import com.silvesterhasani.lufthansatestbackend.model.Applications;
import com.silvesterhasani.lufthansatestbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Applications, Long> {

    List<Applications> findByUsername(String username);
}
