package corinee.cokkiri.request;

import lombok.Data;

@Data
public class ExitRoomRequest {
    private Long index;
    private Long roomNumber;
    private String userEmail;
}
