package corinee.cokkiri.api.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdateNicknameRequest {

    @NotEmpty
    private String email;
    @NotEmpty
    private String nickname;
}
