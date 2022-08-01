package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Question;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class GetQuestionListResponse extends Result {

    private List<FindQuestion> findQuestionList;

    public static GetQuestionListResponse of (int statusCode, String message, List<Question> questionList){
        GetQuestionListResponse resList = new GetQuestionListResponse();
        resList.findQuestionList = new ArrayList<>();
        for(Question question : questionList){
            FindQuestion findQuestion = new FindQuestion();
            findQuestion.setQuestionId(question.getQuestionId());
            findQuestion.setTitle(question.getTitle());
            findQuestion.setContent(question.getContent());
            findQuestion.setRoomId(question.getRoom().getRoomId());
            findQuestion.setQuestionWriterEmail(question.getUser().getEmail());
            findQuestion.setCreateDateTime(question.getCreateDatetime());
            resList.findQuestionList.add(findQuestion);
        }
        resList.setStatusCode(statusCode);
        resList.setMessage(message);
        return resList;
    }

}

@Data
class FindQuestion{
    private Long questionId;
    private String title;
    private String content;
    private Long roomId;
    private String questionWriterEmail;
    private LocalDateTime createDateTime;
}
