package corinee.cokkiri.request;

import lombok.Data;

@Data
public class AnswerAddRequest {
    private Long questionId;
    private String content;
    private String title;
    private Long roomId;
    private String answerWriterEmail;
    private String code;
    private String language;
}
