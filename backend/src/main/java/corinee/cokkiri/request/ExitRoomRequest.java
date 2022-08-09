package corinee.cokkiri.request;

import lombok.Data;

@Data
public class ExitRoomRequest {
    private Long index;
    private Long roomId;
    private String userEmail;
}
