package corinee.cokkiri.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.domain.Room;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class FindRoomListResponse extends BaseResponse {

    private List<FindRoom> findRoomList;

    public static FindRoomListResponse of (int statusCode, String message, List<Room> roomList){
        FindRoomListResponse response = new FindRoomListResponse();
        response.findRoomList = new ArrayList<>();
        response.setStatusCode(statusCode);
        response.setMessage(message);

        for (Room room: roomList) {
            FindRoom findRoom = new FindRoom();
            findRoom.setRoomId(room.getRoomId());
            findRoom.setTitle(room.getTitle());
            findRoom.setCreateDateTime(room.getCreateDatetime());
            findRoom.setUserLimit(room.getUserLimit());
            findRoom.setUserCount(room.getUserCount());
            response.findRoomList.add(findRoom);
        }
        return response;
    }
}

@Data
class FindRoom {
    private Long roomId;
    private String title;
    private LocalDateTime createDateTime;
    private Long userLimit;
    private Long userCount;
}
