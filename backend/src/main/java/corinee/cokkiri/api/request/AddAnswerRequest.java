package corinee.cokkiri.api.request;

import lombok.Data;

@Data
public class AddAnswerRequest {
    private Long questionId;
    private String content;
    private Long roomId;
    private String answerWriterEmail;
    private String code;
    private String language;
}
