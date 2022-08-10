package corinee.cokkiri.controller;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.domain.RecentRoom;
import corinee.cokkiri.domain.Room;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.request.RecentRoomRequest;
import corinee.cokkiri.response.FindRecentRoomListResponse;
import corinee.cokkiri.service.RecentRoomService;
import corinee.cokkiri.service.RoomService;
import corinee.cokkiri.service.UserService;
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
public class RecentRoomController {

    private final RecentRoomService recentRoomService;
    private final UserService userService;
    private final RoomService roomService;

    @GetMapping("/room/recent/{email}")
    @ApiOperation(value = "최근방문 스터디룸 목록 조회", notes = "로그인한 이메일의 최근방문 스터디룸 목록을 3개까지 조회")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
    })
    public ResponseEntity<? extends BaseResponse> findRecentRoom(@PathVariable("email") String email) {
        List<RecentRoom> recentRoomList = recentRoomService.findListByEmail(email);
        if(recentRoomList == null)
            return ResponseEntity.status(204).body(BaseResponse.of(204, "최근 방문한 스터디룸이 존재하지 않습니다"));
        return ResponseEntity.status(200).body(FindRecentRoomListResponse.of(200, "성공", recentRoomList));
    }

    @PostMapping("/room/recent")
    @ApiOperation(value = "최근방문 스터디룸 업데이트", notes = "로그인한 이메일의 최근방문 스터디룸 목록 업데이트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
            @ApiResponse(code=404, message = "방이 존재하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponse> updateRecentRoom(@RequestBody RecentRoomRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if(user == null) {
            return ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        }

        Room room = roomService.findById(request.getRoomId());
        if(room == null) {
            return ResponseEntity.status(404).body(BaseResponse.of(404,"방이 존재하지 않습니다"));
        }

        if(!recentRoomService.duplicatedRoomId(request)) {
            Long recentRoomId = recentRoomService.addRecentRoom(user, room);
            List<RecentRoom> recentRoomList = recentRoomService.findListByEmail(request.getEmail());

            if(recentRoomList.size() > 3) {
                recentRoomService.removeRecentRoom(recentRoomList.get(0));
            }
        }



        return ResponseEntity.status(200).body(BaseResponse.of(200, "성공"));
    }

}
