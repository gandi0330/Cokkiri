package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindUserResponse extends BaseResponse {
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
