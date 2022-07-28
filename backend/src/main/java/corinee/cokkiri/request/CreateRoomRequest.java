package corinee.cokkiri.request;

import corinee.cokkiri.domain.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateRoomRequest {

    private String email;
    private String title;
    private Long userLimit;
}
