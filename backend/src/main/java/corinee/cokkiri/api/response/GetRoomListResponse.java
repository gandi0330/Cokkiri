package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Room;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class GetRoomListResponse extends BaseResponse {

    private List<FindRoom> findRoomList;

    public static GetRoomListResponse of (int statusCode, String message, List<Room> roomList){
        GetRoomListResponse res = new GetRoomListResponse();
        res.findRoomList = new ArrayList<>();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        for (Room room: roomList) {
            FindRoom findRoom = FindRoom.builder()
                    .roomId(room.getRoomId())
                    .title(room.getTitle())
                    .createDateTime(room.getCreateDatetime())
                    .userLimit(room.getUserLimit())
                    .userCount(room.getUserCount())
                    .build();
            res.findRoomList.add(findRoom);
        }
        return res;
    }
}

@Data
@Builder
class FindRoom {
    private Long roomId;
    private String title;
    private LocalDateTime createDateTime;
    private Long userLimit;
    private Long userCount;
}
