package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AddUserLikeRoomResponse extends Result {
    private Long id;

    public static AddUserLikeRoomResponse of(int statusCode, String message, Long id){
        AddUserLikeRoomResponse res = new AddUserLikeRoomResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setId(id);

        return res;
    }
}
