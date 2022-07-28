package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Question;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetQuestionListResponse extends Result {

    private List<Question> questions;

    public static GetQuestionListResponse of (int statusCode, String message, List<Question> questions){
        GetQuestionListResponse res = new GetQuestionListResponse();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setQuestions(questions);
        return res;
    }

}
