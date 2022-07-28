package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Question;
import corinee.cokkiri.domain.Room;
import corinee.cokkiri.request.QuestionAddRequest;
import corinee.cokkiri.request.UpdateQuestionRequest;
import corinee.cokkiri.response.GetQuestionListResponse;
import corinee.cokkiri.response.GetQuestionResponse;
import corinee.cokkiri.service.QuestionService;
import corinee.cokkiri.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@Api(value = "질문 API", tags = {"Question"})
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final RoomService roomService;

    @GetMapping("/question/list/{room_id}")
    @ApiOperation(value="질문 목록조회",notes="해당 방의 질문들을 모두 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="방 없음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends Result> getQuestionList(@PathVariable("room_id") Long roomId){


        Room room = roomService.findById(roomId);

        if(room == null)
            return ResponseEntity.status(404).body(Result.of(404,"방이 존재하지 않습니다"));

        List<Question> questionList = questionService.getQuestionList(roomId);

        return ResponseEntity.status(200).body(GetQuestionListResponse.of(200,"success",questionList));
    }

    @PostMapping("/question")
    @ApiOperation(value="질문 생성", notes="질문을 생성한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="방 없음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<Result> addQuestion(@RequestBody QuestionAddRequest request){
        Room room = roomService.findById(request.getRoomId());

        if(room == null)
            return ResponseEntity.status(404).body(Result.of(404,"방이 존재하지 않습니다"));

        Long questionId = questionService.addQuestion(request);

        if(questionService.getQuestion(questionId) == null)
            return ResponseEntity.status(500).body(Result.of(500, "질문생성 도중 오류가 발생했습니다"));

        return ResponseEntity.status(200).body(Result.of(200,"success"));

    }

    @DeleteMapping("/question/{question_id}")
    @ApiOperation(value="질문 삭제", notes="질문을 삭제한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<Result> removeQuestion(@PathVariable("question_id") Long questionId){
        questionService.removeQuestion(questionId);
        Question question = questionService.getQuestion(questionId);
        if(question != null)
            return ResponseEntity.status(500).body(Result.of(500, "질문이 삭제되지 않았습니다"));
        return ResponseEntity.status(200).body(Result.of(200,"success"));
    }

    @PutMapping("/question")
    @ApiOperation(value="질문 수정", notes="질문을 수정한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="질문이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<Result> updateQuestion(@RequestBody UpdateQuestionRequest request){
        Question question = questionService.getQuestion(request.getQuestionId());

        if(question == null)
            return ResponseEntity.status(404).body(Result.of(404,"질문이 존재하지 않습니다"));

        Question changedQuestion = questionService.updateQuestion(request);

        if (!question.getContent().equals(changedQuestion.getContent()) || !question.getTitle().equals(changedQuestion.getTitle()))
            return ResponseEntity.status(500).body(Result.of(500, "수정되지 않았습니다"));

        return ResponseEntity.status(200).body(Result.of(200,"success"));
    }

    @GetMapping("/question/detail/{question_id}")
    @ApiOperation(value="질문 상세 조회", notes="질문 하나를 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="질문이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends Result> getQuestion(@PathVariable("question_id") Long questionId){
        Question question = questionService.getQuestion(questionId);

        if(question == null)
            return ResponseEntity.status(404).body(Result.of(404, "질문이 존재하지 않습니다"));
        return ResponseEntity.status(200).body(GetQuestionResponse.of(200,"success",question));
    }
}
