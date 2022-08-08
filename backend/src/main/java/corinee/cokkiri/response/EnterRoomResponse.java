package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Openvidu;
import corinee.cokkiri.domain.Room;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EnterRoomResponse extends Result {

    private String token;
    private String connectionId;
    private Long index;
    private String nickname;


    public static EnterRoomResponse of (int statusCode, String message, Openvidu openvidu){
        EnterRoomResponse response = new EnterRoomResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setToken(openvidu.getToken());
        response.setConnectionId(openvidu.getConnectionId());
        response.setIndex(openvidu.getIndex());
        response.setNickname(openvidu.getNickname());
        return response;
    }
}
