package corinee.cokkiri.request;

import lombok.Data;

@Data
public class UpdateAnswerRequest {
    private String email;
    private Long answerId;
    private String title;
    private String content;
}
