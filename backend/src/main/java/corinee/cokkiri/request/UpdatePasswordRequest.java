package corinee.cokkiri.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdatePasswordRequest {

    @NotEmpty
    private String email;
    @NotEmpty
    private String password;
}

