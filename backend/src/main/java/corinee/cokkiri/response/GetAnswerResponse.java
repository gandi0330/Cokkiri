package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Answer;
import corinee.cokkiri.domain.Question;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetAnswerResponse extends Result{

    private Long answerId;
    private String title;
    private String content;
    private Long roomId;
    private Long questionId;
    private String answerWriterEmail;
    private LocalDateTime create_dateTime;
    private String code;
    private String language;

    public static GetAnswerResponse of (int statusCode, String message, Answer answer){
        GetAnswerResponse res = new GetAnswerResponse();
        res.setAnswerId(answer.getAnswerId());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setQuestionId(answer.getQuestion().getQuestionId());
        res.setTitle(answer.getTitle());
        res.setContent(answer.getContent());
        res.setRoomId(answer.getRoom().getRoomId());
        res.setAnswerWriterEmail(answer.getUser().getEmail());
        res.setCreate_dateTime(answer.getCreateDatetime());
        res.setCode(answer.getCode());
        res.setLanguage(answer.getLanguage());

        return res;
    }

}
