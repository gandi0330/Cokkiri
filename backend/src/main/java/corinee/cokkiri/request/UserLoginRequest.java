package corinee.cokkiri.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class UserLoginRequest {
    private String email;
    private String password;
}
