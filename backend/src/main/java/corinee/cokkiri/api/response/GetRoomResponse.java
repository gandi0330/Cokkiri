package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Room;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class GetRoomResponse extends BaseResponse {

    private Long roomId;
    private String title;
    private LocalDateTime createDatetime;
    private Long userLimit;
    private Long userCount;

    public static GetRoomResponse of (int statusCode, String message, Room room){
        GetRoomResponse res = new GetRoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomId(room.getRoomId());
        res.setTitle(room.getTitle());
        res.setCreateDatetime(room.getCreateDatetime());
        res.setUserLimit(room.getUserLimit());
        res.setUserCount(room.getUserCount());
        return res;
    }
}
