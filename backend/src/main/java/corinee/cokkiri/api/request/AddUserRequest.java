package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class AddUserRequest {
    private String email;
    private String password;
    private String nickname;
    private String authToken;
}