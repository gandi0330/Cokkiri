package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EnterRoomResponse extends BaseResponse {

    private Long index;


    public static EnterRoomResponse of (int statusCode, String message, Long index){
        EnterRoomResponse response = new EnterRoomResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setIndex(index);
        return response;
    }
}
