package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.StudyTime;
import corinee.cokkiri.response.FindStudyTimeResponse;
import corinee.cokkiri.service.StudyTimeService;
import io.swagger.annotations.Api;
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
@RequiredArgsConstructor
@Api(value = "공부 시간 API", tags = {"StudyTime"})
@CrossOrigin("*")
public class StudyTimeController {
    private final StudyTimeService studyTimeService;

    @GetMapping("/studytime/{userEmail}")
    @ApiOperation(value = "공부시간 조회", notes = "로그인한 이메일의 공부시간 모두 조회")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다")
    })
    public ResponseEntity<? extends Result> checkStudyTime(@PathVariable("userEmail") String email) {
        List<StudyTime> studyTimeList = studyTimeService.findListByEmail(email);

        if(studyTimeList.isEmpty()) {
            return  ResponseEntity.status(404).body(Result.of(404,"유저가 존재하지 않습니다"));
        }



        long time = studyTimeService.calStudyTime(studyTimeList);

        return ResponseEntity.status(200).body(FindStudyTimeResponse.of(200, "성공", time));
    }
}
