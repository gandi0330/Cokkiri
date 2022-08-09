package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateRoomResponse extends Result {
    private Long roomId;

    public static CreateRoomResponse of(int statusCode, String message, Long roomId){
        CreateRoomResponse res = new CreateRoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomId(roomId);
        return res;
    }
}
