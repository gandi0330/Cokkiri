package corinee.cokkiri.request;

import lombok.Data;

@Data
public class EnterRoomRequest {
    private Long roomNumber;
    private String userEmail;
}
