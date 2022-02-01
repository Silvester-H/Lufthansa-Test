package com.silvesterhasani.lufthansatestbackend.repository;

import com.silvesterhasani.lufthansatestbackend.model.Applications;
import com.silvesterhasani.lufthansatestbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Applications, Long> {

    @Query("FROM Applications WHERE username=:username")
    Applications findByUsername(@Param("username") String username);

}
