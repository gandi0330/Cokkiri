package corinee.cokkiri.api.controller;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Answer;
import corinee.cokkiri.db.domain.Question;
import corinee.cokkiri.api.request.AddAnswerRequest;
import corinee.cokkiri.api.request.UpdateAnswerRequest;
import corinee.cokkiri.api.response.GetAnswerListResponse;
import corinee.cokkiri.api.response.GetAnswerResponse;
import corinee.cokkiri.api.service.AnswerService;
import corinee.cokkiri.api.service.QuestionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Api(value="답변 API", tags= {"Answer"})
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    private final QuestionService questionService;


    @GetMapping("/answer/list/{question_id}")
    @ApiOperation(value="답변 목록조회", notes="답변 목록을 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="자원이 없음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends BaseResponse> getAnswerList(@PathVariable("question_id") Long questionId){
        Question question = questionService.findById(questionId);

        if(question == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"질문이 존재하지 않습니다"));

        List<Answer> answerList = answerService.findListById(questionId);

        return ResponseEntity.status(200).body(GetAnswerListResponse.of(200,"success", answerList));
    }

    @PostMapping("/answer")
    @ApiOperation(value="답변 생성", notes="답변을 생성한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="자원이 없음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<BaseResponse> addAnswer(@RequestBody AddAnswerRequest request){
        Question question = questionService.findById(request.getQuestionId());

        if(question == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"질문이 존재하지 않습니다"));

        Long answerId = answerService.addAnswer(request);

        if(answerService.findById(answerId) == null)
            return ResponseEntity.status(500).body(BaseResponse.of(500, "답변생성 도중 오류가 발생했습니다"));

        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));

    }

    @GetMapping("/answer/detail/{answer_id}")
    @ApiOperation(value="답변 상세조회", notes="답변 하나를 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="답변이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends BaseResponse> getAnswer(@PathVariable("answer_id") Long answerId){
        Answer answer = answerService.findById(answerId);

        if(answer == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404, "답변이 존재하지 않습니다"));
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
    public ResponseEntity<BaseResponse> updateAnswer(@RequestBody UpdateAnswerRequest request){
        Answer answer = answerService.findById(request.getAnswerId());

        if(answer == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"질문이 존재하지 않습니다"));

        if(!request.getEmail().equals(answer.getUser().getEmail()))
            return ResponseEntity.status(403).body(BaseResponse.of(403,"수정에 대한 권한이 없습니다"));

        Answer changedAnswer = answerService.updateAnswer(request);

        if (!answer.getContent().equals(changedAnswer.getContent()))
            return ResponseEntity.status(500).body(BaseResponse.of(500, "수정되지 않았습니다"));

        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));
    }

    @DeleteMapping("/answer/{answer_id}/{email}")
    @ApiOperation(value="답변 삭제", notes="답변을 삭제한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=403, message="답변 삭제의 권한이 없음"),
            @ApiResponse(code=404, message="답변이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<BaseResponse> delAnswer(@PathVariable("answer_id") Long answerId, @PathVariable("email") String email){

        Answer answer = answerService.findById(answerId);

        if(answer == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"존재하지 않는 답변입니다"));

        if(!email.equals(answer.getUser().getEmail()))
            return ResponseEntity.status(403).body(BaseResponse.of(403,"삭제에 대한 권한이 없습니다"));

        answerService.delAnswer(answerId);

        Answer removedAnswer = answerService.findById(answerId);
        if(removedAnswer != null)
            return ResponseEntity.status(500).body(BaseResponse.of(500, "답변이 삭제되지 않았습니다"));

        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));
    }

}
