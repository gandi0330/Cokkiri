package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Room;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class FindRoomResponse extends BaseResponse {

    private Long roomId;
    private String title;
    private LocalDateTime createDatetime;
    private Long userLimit;
    private Long userCount;

    public static FindRoomResponse of (int statusCode, String message, Room room){
        FindRoomResponse response = new FindRoomResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setRoomId(room.getRoomId());
        response.setTitle(room.getTitle());
        response.setCreateDatetime(room.getCreateDatetime());
        response.setUserLimit(room.getUserLimit());
        response.setUserCount(room.getUserCount());
        return response;
    }
}
