package corinee.cokkiri.request;

import lombok.Data;

@Data
public class RecentRoomRequest {
    private String email;
    private Long roomId;
}
