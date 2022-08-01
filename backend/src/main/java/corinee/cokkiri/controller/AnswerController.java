package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Answer;
import corinee.cokkiri.domain.Question;
import corinee.cokkiri.domain.Room;
import corinee.cokkiri.request.AnswerAddRequest;
import corinee.cokkiri.request.QuestionAddRequest;
import corinee.cokkiri.request.UpdateAnswerRequest;
import corinee.cokkiri.request.UpdateQuestionRequest;
import corinee.cokkiri.response.GetAnswerListResponse;
import corinee.cokkiri.response.GetAnswerResponse;
import corinee.cokkiri.response.GetQuestionResponse;
import corinee.cokkiri.service.AnswerService;
import corinee.cokkiri.service.QuestionService;
import corinee.cokkiri.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.QueryEval;
import java.util.List;

@RestController
@CrossOrigin("*")
@Api(value="답변 API", tags= {"Answer"})
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    private final QuestionService questionService;


    @GetMapping("/answer/list/{answer_id}")
    @ApiOperation(value="답변 목록조회", notes="답변 목록을 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="자원이 없음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends Result> getAnswerList(@PathVariable("question_id") Long questionId){
        Question question = questionService.getQuestion(questionId);

        if(question == null)
            return ResponseEntity.status(404).body(Result.of(404,"질문이 존재하지 않습니다"));

        List<Answer> answerList = answerService.getAnswerList(questionId);

        return ResponseEntity.status(200).body(GetAnswerListResponse.of(200,"success", answerList));
    }

    @PostMapping("/answer")
    @ApiOperation(value="답변 생성", notes="답변을 생성한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="자원이 없음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<Result> addAnswer(@RequestBody AnswerAddRequest request){
        Question question = questionService.getQuestion(request.getQuestionId());

        if(question == null)
            return ResponseEntity.status(404).body(Result.of(404,"질문이 존재하지 않습니다"));

        Long answerId = answerService.addAnswer(request);

        if(answerService.getAnswer(answerId) == null)
            return ResponseEntity.status(500).body(Result.of(500, "답변생성 도중 오류가 발생했습니다"));

        return ResponseEntity.status(200).body(Result.of(200,"success"));

    }

    @GetMapping("/answer/detail/{answer_id}")
    @ApiOperation(value="답변 상세조회", notes="답변 하나를 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="답변이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends Result> getAnswer(@PathVariable("answer_id") Long answerId){
        Answer answer = answerService.getAnswer(answerId);

        if(answer == null)
            return ResponseEntity.status(404).body(Result.of(404, "답변이 존재하지 않습니다"));
        return ResponseEntity.status(200).body(GetAnswerResponse.of(200,"success",answer));
    }

    @PutMapping("/answer")
    @ApiOperation(value="답변 수정", notes="답변을 수정한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=403, message="답변 수정의 권한이 없음"),
            @ApiResponse(code=404, message="답변이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<Result> updateAnswer(@RequestBody UpdateAnswerRequest request){
        Answer answer = answerService.getAnswer(request.getAnswerId());

        if(answer == null)
            return ResponseEntity.status(404).body(Result.of(404,"질문이 존재하지 않습니다"));

        if(!request.getEmail().equals(answer.getUser().getEmail()))
            return ResponseEntity.status(403).body(Result.of(403,"수정에 대한 권한이 없습니다"));

        Answer changedAnswer = answerService.updateAnswer(request);

        if (!answer.getContent().equals(changedAnswer.getContent()) || !answer.getTitle().equals(changedAnswer.getTitle()))
            return ResponseEntity.status(500).body(Result.of(500, "수정되지 않았습니다"));

        return ResponseEntity.status(200).body(Result.of(200,"success"));
    }

    @DeleteMapping("/answer/{answer_id}/{email}")
    @ApiOperation(value="답변 삭제", notes="답변을 삭제한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=403, message="답변 삭제의 권한이 없음"),
            @ApiResponse(code=404, message="답변이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<Result> removeAnswer(@PathVariable("answer_id") Long answerId, @PathVariable("email") String email){

        Answer answer = answerService.getAnswer(answerId);

        if(answer == null)
            return ResponseEntity.status(404).body(Result.of(404,"존재하지 않는 답변입니다"));

        if(!email.equals(answer.getUser().getEmail()))
            return ResponseEntity.status(403).body(Result.of(403,"삭제에 대한 권한이 없습니다"));

        answerService.removeAnswer(answerId);

        Answer removedAnswer = answerService.getAnswer(answerId);
        if(removedAnswer != null)
            return ResponseEntity.status(500).body(Result.of(500, "답변이 삭제되지 않았습니다"));

        return ResponseEntity.status(200).body(Result.of(200,"success"));
    }

}
