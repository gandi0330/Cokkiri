package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Room;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class FindRoomResponse extends Result {

    private Long roomId;
    private String title;
    private LocalDateTime createDatetime;
    private Long userLimit;

    public static FindRoomResponse of (int statusCode, String message, Room room){
        FindRoomResponse response = new FindRoomResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setRoomId(room.getRoomId());
        response.setTitle(room.getTitle());
        response.setCreateDatetime(room.getCreateDatetime());
        response.setUserLimit(room.getUserLimit());
        return response;
    }
}
