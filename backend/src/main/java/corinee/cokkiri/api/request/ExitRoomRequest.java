package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class ExitRoomRequest {
    private Long id;
    private Long roomId;
    private String email;
}
