package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AddRoomResponse extends BaseResponse {
    private Long roomId;

    public static AddRoomResponse of(int statusCode, String message, Long roomId){
        AddRoomResponse res = new AddRoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomId(roomId);
        return res;
    }
}
