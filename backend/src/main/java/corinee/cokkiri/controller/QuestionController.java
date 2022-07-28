package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Question;
import corinee.cokkiri.response.GetQuestionListResponse;
import corinee.cokkiri.service.QuestionService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/question/{room_id}")
    @ApiOperation(value="질문 목록조회",notes="해당 방의 질문들을 모두 조회한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공"),
            @ApiResponse(code=500, message="서버 오류")
    })
    public ResponseEntity<? extends Result> getQuestionList(@PathVariable("room_id") Long roomId){
        List<Question> questionList = questionService.getQuestionList(roomId);

        return ResponseEntity.status(200).body(GetQuestionListResponse.of(200,"success",questionList));
    }
}
