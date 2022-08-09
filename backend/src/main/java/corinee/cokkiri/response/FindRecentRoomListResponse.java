package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.RecentRoom;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class FindRecentRoomListResponse extends Result {

    private List<FindRecentRoom> findRecentRoomList;

    public static FindRecentRoomListResponse of (int statusCode, String message, List<RecentRoom> recentRoomList) {
        FindRecentRoomListResponse response = new FindRecentRoomListResponse();
        response.findRecentRoomList = new ArrayList<>();

        for(RecentRoom recentRoom : recentRoomList) {
            FindRecentRoom findRecentRoom = new FindRecentRoom();
            findRecentRoom.setEmail(recentRoom.getUser().getEmail());
            findRecentRoom.setRoomId(recentRoom.getRoom().getRoomId());
            findRecentRoom.setTitle(recentRoom.getRoom().getTitle());
            response.findRecentRoomList.add(findRecentRoom);
        }

        response.setStatusCode(statusCode);
        response.setMessage(message);

        return response;
    }
}

@Data
class FindRecentRoom {
    private String email;
    private Long roomId;
    private String title;
}