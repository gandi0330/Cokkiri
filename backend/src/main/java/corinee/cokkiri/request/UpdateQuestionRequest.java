package corinee.cokkiri.request;

import lombok.Data;

@Data
public class UpdateQuestionRequest {
    private Long questionId;
    private String title;
    private String content;
}
