package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Answer;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetAnswerListResponse extends Result {
    private List<FindAnswer> findAnswerList;

    public static GetAnswerListResponse of(int statusCode, String message, List<Answer> answerList){
        GetAnswerListResponse resList = new GetAnswerListResponse();
        resList.findAnswerList = new ArrayList<>();
        for(Answer answer : answerList){
            FindAnswer findAnswer = FindAnswer.builder()
                    .questionId(answer.getQuestion().getQuestionId())
                    .title(answer.getTitle())
                    .content(answer.getContent())
                    .roomId(answer.getRoom().getRoomId())
                    .answerWriterEmail(answer.getUser().getEmail())
                    .answerId(answer.getAnswerId())
                    .create_dateTime(answer.getCreateDatetime())
                    .code(answer.getCode())
                    .language(answer.getLanguage())
                    .build();
            resList.findAnswerList.add(findAnswer);
        }
        resList.setStatusCode(statusCode);
        resList.setMessage(message);
        return resList;
    }
}

@Data
@Builder
class FindAnswer{
    private Long answerId;
    private String title;
    private String content;
    private Long roomId;
    private Long questionId;
    private String answerWriterEmail;
    private LocalDateTime create_dateTime;
    private String code;
    private String language;
}
