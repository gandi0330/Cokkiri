package corinee.cokkiri.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse {
    private int statusCode;
    private String message;

    public static BaseResponse of(int statusCode, String message){
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatusCode(statusCode);
        baseResponse.setMessage(message);
        return baseResponse;
    }
}