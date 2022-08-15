package corinee.cokkiri.api.controller;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Question;
import corinee.cokkiri.db.domain.Room;
import corinee.cokkiri.api.request.AddQuestionRequest;
import corinee.cokkiri.api.request.UpdateQuestionRequest;
import corinee.cokkiri.api.response.GetQuestionListResponse;
import corinee.cokkiri.api.response.GetQuestionResponse;
import corinee.cokkiri.api.service.QuestionService;
import corinee.cokkiri.api.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
    public ResponseEntity<? extends BaseResponse> getQuestionList(@PathVariable("room_id") Long roomId){


        Room room = roomService.findById(roomId);

        if(room == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"방이 존재하지 않습니다"));

        List<Question> questionList = questionService.findListById(roomId);

        return ResponseEntity.status(200).body(GetQuestionListResponse.of(200,"success",questionList));
    }

    @PostMapping("/question")
    @ApiOperation(value="질문 생성", notes="질문을 생성한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="방 없음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<BaseResponse> addQuestion(@RequestBody AddQuestionRequest request){
        Room room = roomService.findById(request.getRoomId());

        if(room == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"방이 존재하지 않습니다"));

        Long questionId = questionService.addQuestion(request);

        if(questionService.findById(questionId) == null)
            return ResponseEntity.status(500).body(BaseResponse.of(500, "질문생성 도중 오류가 발생했습니다"));

        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));

    }

    @DeleteMapping("/question/{question_id}/{email}")
    @ApiOperation(value="질문 삭제", notes="질문을 삭제한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=403, message="질문 삭제의 권한이 없음"),
            @ApiResponse(code=404, message="질문이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<BaseResponse> delQuestion(@PathVariable("question_id") Long questionId, @PathVariable("email") String email){
        Question question = questionService.findById(questionId);

        if(question == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"존재하지 않는 질문입니다"));
        if(!email.equals(question.getUser().getEmail()))
            return ResponseEntity.status(403).body(BaseResponse.of(403, "삭제에 대한 권한이 없습니다"));

        questionService.delQuestion(questionId);

        Question removedQuestion = questionService.findById(questionId);
        if(removedQuestion != null)
            return ResponseEntity.status(500).body(BaseResponse.of(500, "질문이 삭제되지 않았습니다"));

        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));
    }

    @PutMapping("/question")
    @ApiOperation(value="질문 수정", notes="질문을 수정한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=403, message="질문 수정의 권한이 없음"),
            @ApiResponse(code=404, message="질문이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<BaseResponse> updateQuestion(@RequestBody UpdateQuestionRequest request){
        Question question = questionService.findById(request.getQuestionId());

        if(question == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"질문이 존재하지 않습니다"));

        if(!request.getEmail().equals(question.getUser().getEmail()))
            return ResponseEntity.status(403).body(BaseResponse.of(403,"수정에 대한 권한이 없습니다"));

        Question changedQuestion = questionService.updateQuestion(request);

        if (changedQuestion == null || !question.getContent().equals(changedQuestion.getContent()) || !question.getTitle().equals(changedQuestion.getTitle()))
            return ResponseEntity.status(500).body(BaseResponse.of(500, "수정되지 않았습니다"));

        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));
    }

    @GetMapping("/question/detail/{question_id}")
    @ApiOperation(value="질문 상세 조회", notes="질문 하나를 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=404, message="질문이 존재하지 않음"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends BaseResponse> getQuestion(@PathVariable("question_id") Long questionId){
        Question question = questionService.findById(questionId);

        if(question == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404, "질문이 존재하지 않습니다"));
        return ResponseEntity.status(200).body(GetQuestionResponse.of(200,"success",question));
    }
}
