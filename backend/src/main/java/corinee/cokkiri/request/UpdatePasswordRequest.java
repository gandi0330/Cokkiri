package corinee.cokkiri.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdatePasswordRequest {

    @NotEmpty
    private String userEmail;
    @NotEmpty
    private String password;
}

