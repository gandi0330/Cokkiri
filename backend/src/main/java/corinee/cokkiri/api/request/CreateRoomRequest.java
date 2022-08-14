package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class CreateRoomRequest {

    private String email;
    private String title;
    private Long userLimit;
}
