package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Room;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EnterRoomResponse extends Result {

    private Long index;

    public static EnterRoomResponse of (int statusCode, String message, Long index){
        EnterRoomResponse response = new EnterRoomResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setIndex(index);
        return response;
    }
}
