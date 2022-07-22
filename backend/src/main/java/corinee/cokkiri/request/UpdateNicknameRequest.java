package corinee.cokkiri.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdateNicknameRequest {

    @NotEmpty
    private String nickname;
}
