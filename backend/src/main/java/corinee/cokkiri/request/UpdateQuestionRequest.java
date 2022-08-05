package corinee.cokkiri.request;

import lombok.Data;

@Data
public class UpdateQuestionRequest {
    private String email;
    private Long questionId;
    private String title;
    private String content;
    private String code;
    private String language;
}
