package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EnterRoomResponse extends BaseResponse {

    private Long id;

    public static EnterRoomResponse of (int statusCode, String message, Long id){
        EnterRoomResponse res = new EnterRoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setId(id);
        return res;
    }
}
