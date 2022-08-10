package corinee.cokkiri.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.domain.UserLikeRoom;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class FindUserLikeRoomListResponse extends BaseResponse {

    private List<FindUserLikeRoom> userLikeRoomList;


    public static FindUserLikeRoomListResponse of (int statusCode, String message, List<UserLikeRoom> userLikeRoomList) {
        FindUserLikeRoomListResponse response = new FindUserLikeRoomListResponse();
        response.userLikeRoomList = new ArrayList<>();

        for(UserLikeRoom userLikeRoom : userLikeRoomList) {
            FindUserLikeRoom findUserLikeRoom = new FindUserLikeRoom();
            findUserLikeRoom.setEmail(userLikeRoom.getUser().getEmail());
            findUserLikeRoom.setRoomId(userLikeRoom.getRoom().getRoomId());
            findUserLikeRoom.setTitle(userLikeRoom.getRoom().getTitle());
            findUserLikeRoom.setId(userLikeRoom.getId());
            response.userLikeRoomList.add(findUserLikeRoom);
        }
        response.setStatusCode(statusCode);
        response.setMessage(message);

        return response;
    }
}

@Data
class FindUserLikeRoom {
    private String email;
    private Long roomId;
    private String title;
    private Long id;
}