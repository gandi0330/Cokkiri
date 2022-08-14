package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class UpdateAnswerRequest {
    private String email;
    private Long answerId;
    private String content;
    private String code;
    private String language;
}
