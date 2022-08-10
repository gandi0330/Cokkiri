package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EnterRoomResponse extends BaseResponse {

    private Long id;


    public static EnterRoomResponse of (int statusCode, String message, Long id){
        EnterRoomResponse response = new EnterRoomResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setId(id);
        return response;
    }
}
