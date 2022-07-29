package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.UserLikeRoom;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class UserLikeRoomListResponse extends Result {

    private List<UserLikeRoom> userLikeRoomList;


    public static UserLikeRoomListResponse of (int statusCode, String message, List<UserLikeRoom> userLikeRoomList) {
        UserLikeRoomListResponse response = new UserLikeRoomListResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setUserLikeRoomList(userLikeRoomList);

        return response;
    }
}
