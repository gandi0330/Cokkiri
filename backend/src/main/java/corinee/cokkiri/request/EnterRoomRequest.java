package corinee.cokkiri.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EnterRoomRequest {
    private Long roomNumber;
    private String userEmail;
}
