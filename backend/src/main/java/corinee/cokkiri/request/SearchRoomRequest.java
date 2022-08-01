package corinee.cokkiri.request;

import lombok.Data;

@Data
public class SearchRoomRequest {

    private String column;
    private String value;
    private int offset;
    private int limit;
}
