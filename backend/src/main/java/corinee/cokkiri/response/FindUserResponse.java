package corinee.cokkiri.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FindUserResponse{
    private String email;
    private String nickname;
}
