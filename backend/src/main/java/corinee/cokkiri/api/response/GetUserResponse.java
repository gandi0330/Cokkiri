package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetUserResponse extends BaseResponse {
    private String email;
    private String nickname;

    public static GetUserResponse of (int statusCode , String message, User user){
        GetUserResponse res = new GetUserResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setEmail(user.getEmail());
        res.setNickname(user.getNickname());
        return res;
    }
}
