package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindUserResponse extends Result {
    private String email;
    private String nickname;

    public static FindUserResponse of (int statusCode , String message, User user){
        FindUserResponse res = new FindUserResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setEmail(user.getEmail());
        res.setNickname(user.getNickname());
        return res;
    }
}
