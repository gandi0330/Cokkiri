package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Answer;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetAnswerListResponse extends BaseResponse {
    private List<FindAnswer> findAnswerList;

    public static GetAnswerListResponse of(int statusCode, String message, List<Answer> answerList){
        GetAnswerListResponse res = new GetAnswerListResponse();
        res.findAnswerList = new ArrayList<>();
        for(Answer answer : answerList){
            FindAnswer findAnswer = FindAnswer.builder()
                    .questionId(answer.getQuestion().getQuestionId())
                    .content(answer.getContent())
                    .roomId(answer.getRoom().getRoomId())
                    .answerWriterEmail(answer.getUser().getEmail())
                    .answerId(answer.getAnswerId())
                    .create_dateTime(answer.getCreateDatetime())
                    .code(answer.getCode())
                    .language(answer.getLanguage())
                    .build();
            res.findAnswerList.add(findAnswer);
        }
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

@Data
@Builder
class FindAnswer{
    private Long answerId;
    private String content;
    private Long roomId;
    private Long questionId;
    private String answerWriterEmail;
    private LocalDateTime create_dateTime;
    private String code;
    private String language;
}
