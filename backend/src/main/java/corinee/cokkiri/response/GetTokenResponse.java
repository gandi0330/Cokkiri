package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetTokenResponse extends Result {
    private String accessToken;
    private String email;

    public static GetTokenResponse of(int statusCode, String message, String accessToken, String email){
        GetTokenResponse res = new GetTokenResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setEmail(email);
        return res;
    }


}
