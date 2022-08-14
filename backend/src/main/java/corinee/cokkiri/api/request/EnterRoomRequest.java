package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class EnterRoomRequest {
    private Long roomId;
    private String email;
}
