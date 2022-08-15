package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Question;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetQuestionResponse extends BaseResponse {
    private Long questionId;
    private String title;
    private String content;
    private Long roomId;
    private String code;
    private String language;
    private String questionWriterEmail;
    private LocalDateTime create_dateTime;

    public static GetQuestionResponse of (int statusCode, String message, Question question){
        GetQuestionResponse res = new GetQuestionResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setQuestionId(question.getQuestionId());
        res.setTitle(question.getTitle());
        res.setContent(question.getContent());
        res.setRoomId(question.getRoom().getRoomId());
        res.setQuestionWriterEmail(question.getUser().getEmail());
        res.setCreate_dateTime(question.getCreateDatetime());
        res.setCode(question.getCode());
        res.setLanguage(question.getLanguage());

        return res;
    }
}
