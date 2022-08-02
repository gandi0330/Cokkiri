package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.RecentRoom;
import corinee.cokkiri.response.FindRecentRoomListResponse;
import corinee.cokkiri.service.RecentRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value = "최근방문 스터디룸 API", tags = {"RecentRoom"})
@CrossOrigin("*")
public class RecentRoomController {

    private final RecentRoomService recentRoomService;

    @GetMapping("/room/recent/{user_email}")
    @ApiOperation(value = "최근방문 스터디룸 목록 조회", notes = "로그인한 이메일의 최근방문 스터디룸 목록을 3개까지 조회")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "최근 방문한 페이지가 없습니다"),
    })
    public ResponseEntity<? extends Result> findRecentRoom(@PathVariable("user_email") String email) {
        List<RecentRoom> recentRoomList = recentRoomService.findListByEmail(email);

        if(recentRoomList.isEmpty()) {
            return  ResponseEntity.status(404).body(Result.of(404, "최근 방문한 페이지가 없습니다"));
        }

        return ResponseEntity.status(200).body(FindRecentRoomListResponse.of(200, "성공", recentRoomList));
    }





}
