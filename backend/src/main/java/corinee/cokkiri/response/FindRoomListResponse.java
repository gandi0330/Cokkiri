package corinee.cokkiri.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.domain.Room;
import lombok.Builder;
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
            FindRoom findRoom = FindRoom.builder()
                    .roomId(room.getRoomId())
                    .title(room.getTitle())
                    .createDateTime(room.getCreateDatetime())
                    .userLimit(room.getUserLimit())
                    .userCount(room.getUserCount())
                    .build();
            response.findRoomList.add(findRoom);
        }
        return response;
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
