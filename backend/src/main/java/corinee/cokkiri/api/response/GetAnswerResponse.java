package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Answer;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetAnswerResponse extends BaseResponse {

    private Long answerId;
    private String content;
    private Long roomId;
    private Long questionId;
    private String answerWriterEmail;
    private LocalDateTime create_dateTime;
    private String code;
    private String language;
    private String nickname;

    public static GetAnswerResponse of (int statusCode, String message, Answer answer){
        GetAnswerResponse res = new GetAnswerResponse();
        res.setAnswerId(answer.getAnswerId());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setQuestionId(answer.getQuestion().getQuestionId());
        res.setContent(answer.getContent());
        res.setRoomId(answer.getRoom().getRoomId());
        res.setAnswerWriterEmail(answer.getUser().getEmail());
        res.setCreate_dateTime(answer.getCreateDatetime());
        res.setCode(answer.getCode());
        res.setLanguage(answer.getLanguage());
        res.setNickname(answer.getUser().getNickname());

        return res;
    }

}
