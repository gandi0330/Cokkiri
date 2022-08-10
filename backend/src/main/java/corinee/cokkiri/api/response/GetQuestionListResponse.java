package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Question;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetQuestionListResponse extends BaseResponse {

    private List<FindQuestion> findQuestionList;

    public static GetQuestionListResponse of (int statusCode, String message, List<Question> questionList){
        GetQuestionListResponse resList = new GetQuestionListResponse();
        resList.findQuestionList = new ArrayList<>();
        for(Question question : questionList){
            FindQuestion findQuestion = FindQuestion.builder()
                    .questionId(question.getQuestionId())
                    .title(question.getTitle())
                    .content(question.getContent())
                    .roomId(question.getRoom().getRoomId())
                    .questionWriterEmail(question.getUser().getEmail())
                    .createDateTime(question.getCreateDatetime())
                    .language(question.getLanguage())
                    .code(question.getCode())
                    .build();
            resList.findQuestionList.add(findQuestion);
        }
        resList.setStatusCode(statusCode);
        resList.setMessage(message);
        return resList;
    }

}

@Data
@Builder
class FindQuestion{
    private Long questionId;
    private String title;
    private String content;
    private Long roomId;
    private String language;
    private String code;
    private String questionWriterEmail;
    private LocalDateTime createDateTime;
}
