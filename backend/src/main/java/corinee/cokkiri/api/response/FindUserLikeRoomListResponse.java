package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.UserLikeRoom;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class FindUserLikeRoomListResponse extends BaseResponse {

    private List<FindUserLikeRoom> userLikeRoomList;


    public static FindUserLikeRoomListResponse of (int statusCode, String message, List<UserLikeRoom> userLikeRoomList) {
        FindUserLikeRoomListResponse res = new FindUserLikeRoomListResponse();
        res.userLikeRoomList = new ArrayList<>();

        for(UserLikeRoom userLikeRoom : userLikeRoomList) {
            FindUserLikeRoom findUserLikeRoom = FindUserLikeRoom.builder()
                    .email(userLikeRoom.getUser().getEmail())
                    .roomId(userLikeRoom.getRoom().getRoomId())
                    .title(userLikeRoom.getRoom().getTitle())
                    .id(userLikeRoom.getId())
                    .build();
            res.userLikeRoomList.add(findUserLikeRoom);
        }
        res.setStatusCode(statusCode);
        res.setMessage(message);

        return res;
    }
}

@Data
@Builder
class FindUserLikeRoom {
    private String email;
    private Long roomId;
    private String title;
    private Long id;
}