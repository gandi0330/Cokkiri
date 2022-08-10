package corinee.cokkiri.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginResponse extends BaseResponse {
    private String accessToken;
    private String email;

    public static UserLoginResponse of(int statusCode, String message, String accessToken, String email){
        UserLoginResponse res = new UserLoginResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setEmail(email);
        return res;
    }


}
