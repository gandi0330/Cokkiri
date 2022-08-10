package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.RecentRoom;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class FindRecentRoomListResponse extends BaseResponse {

    private List<FindRecentRoom> findRecentRoomList;

    public static FindRecentRoomListResponse of (int statusCode, String message, List<RecentRoom> recentRoomList) {
        FindRecentRoomListResponse res = new FindRecentRoomListResponse();
        res.findRecentRoomList = new ArrayList<>();

        for(RecentRoom recentRoom : recentRoomList) {
            FindRecentRoom findRecentRoom = FindRecentRoom.builder()
                            .email(recentRoom.getUser().getEmail())
                            .roomId(recentRoom.getRoom().getRoomId())
                            .title(recentRoom.getRoom().getTitle())
                            .build();
            res.findRecentRoomList.add(findRecentRoom);
        }

        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}

@Data
@Builder
class FindRecentRoom {
    private String email;
    private Long roomId;
    private String title;
}