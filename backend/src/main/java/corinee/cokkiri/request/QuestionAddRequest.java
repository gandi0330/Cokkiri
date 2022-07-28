package corinee.cokkiri.request;

import lombok.Data;

@Data
public class QuestionAddRequest {
    private String email;
    private Long roomId;
    private String title;
    private String content;
}
