package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Room;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.domain.UserLikeRoom;
import corinee.cokkiri.request.UserLikeRoomRequest;
import corinee.cokkiri.response.UserLikeRoomListResponse;
import corinee.cokkiri.service.RoomService;
import corinee.cokkiri.service.UserLikeRoomService;
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
@Api(value = "스터디룸 즐겨찾기 API", tags = {"UserLikeRoom"})
@CrossOrigin("*")
public class UserLikeRoomController {

    private final UserLikeRoomService userLikeRoomService;

    private final UserService userService;

    private final RoomService roomService;

    @GetMapping("/room/favorite/{user_email}")
    @ApiOperation(value = "스터디룸 즐겨찾기 목록 조회", notes = "로그인한 이메일의 스터디룸 즐겨찾기 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "즐겨찾기 목록이 존재하지 않습니다"),
    })
    public ResponseEntity<? extends Result> findUserLikeRoom(@PathVariable("user_email") String email) {
        List<UserLikeRoom> userLikeRoomList = userLikeRoomService.findListByEmail(email);

        if(userLikeRoomList.isEmpty()) {
            return ResponseEntity.status(404).body(Result.of(404, "즐겨찾기 목록이 존재하지 않습니다"));
        }

        return ResponseEntity.status(200).body(UserLikeRoomListResponse.of(200, "성공", userLikeRoomList));
    }

    @PostMapping("/room/favorite")
    @ApiOperation(value = "스터디룸 즐겨찾기 추가", notes = "로그인한 이메일의 스터디룸 즐겨찾기 추가")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
            @ApiResponse(code=404, message = "방이 존재하지 않습니다"),
            @ApiResponse(code=500, message = "즐겨찾기 등록에 실패했습니다"),
    })
    public ResponseEntity<? extends Result> addUserLikeRoom(@RequestBody UserLikeRoomRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if(user == null) {
            return ResponseEntity.status(404).body(Result.of(404,"유저가 존재하지 않습니다"));
        }

        Room room = roomService.findById(request.getRoomId());
        if(room == null) {
            return ResponseEntity.status(404).body(Result.of(404,"방이 존재하지 않습니다"));
        }

        Long userLikeRoomId = userLikeRoomService.addUserLikeRoom(user, room);

        if(userLikeRoomService.checkUserLikeRoom(userLikeRoomId) == null) {
            return ResponseEntity.status(500).body(Result.of(500, "즐겨찾기 등록에 실패했습니다"));
        }

        return ResponseEntity.status(200).body(Result.of(200,"성공"));
    }

    @DeleteMapping("/room/favorite")
    @ApiOperation(value = "스터디룸 즐겨찾기 추가", notes = "로그인한 이메일의 스터디룸 즐겨찾기 추가")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "즐겨찾기 목록이 삭제되지 않았습니다"),
    })
    public ResponseEntity<? extends Result> delUserLikeRoom(@RequestBody Long userLikeRoomId) {
        userLikeRoomService.removeUserLikeRoom(userLikeRoomId);
        UserLikeRoom userLikeRoom = userLikeRoomService.checkUserLikeRoom(userLikeRoomId);

        if(userLikeRoom != null) {
            return ResponseEntity.status(500).body(Result.of(500, "즐겨찾기 목록이 삭제되지 않았습니다"));
        }
        return ResponseEntity.status(200).body(Result.of(200,"성공"));
    }
}
