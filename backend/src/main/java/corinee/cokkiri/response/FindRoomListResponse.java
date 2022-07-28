package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Question;
import corinee.cokkiri.domain.Room;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class FindRoomListResponse extends Result {

    private List<Room> roomList;

    public static FindRoomListResponse of (int statusCode, String message, List<Room> roomList){
        FindRoomListResponse response = new FindRoomListResponse();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setRoomList(roomList);
        return response;
    }
}
