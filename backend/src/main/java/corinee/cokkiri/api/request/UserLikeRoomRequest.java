package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class UserLikeRoomRequest {
    private String email;
    private Long roomId;
}
