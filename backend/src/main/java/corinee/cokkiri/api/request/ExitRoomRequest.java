package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class ExitRoomRequest {
    private Long index;
    private Long roomId;
    private String email;
}
