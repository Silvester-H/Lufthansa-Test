package com.silvesterhasani.lufthansatestbackend.model;

public class AuthenticationResponse {

    private final String jwt;
    private final String user_type;

    public String getJwt() {
        return jwt;
    }
    public String getUser_type() {
        return user_type;
    }



    public AuthenticationResponse(String jwt, String user_type) {
        this.jwt = jwt;
        this.user_type = user_type;
    }
}
