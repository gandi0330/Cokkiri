package corinee.cokkiri.api.controller;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Room;
import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.db.domain.UserLikeRoom;
import corinee.cokkiri.api.request.UserLikeRoomRequest;
import corinee.cokkiri.api.response.AddUserLikeRoomResponse;
import corinee.cokkiri.api.response.FindUserLikeRoomListResponse;
import corinee.cokkiri.api.service.RoomService;
import corinee.cokkiri.api.service.UserLikeRoomService;
import corinee.cokkiri.api.service.UserService;
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
public class UserLikeRoomController {

    private final UserLikeRoomService userLikeRoomService;

    private final UserService userService;

    private final RoomService roomService;

    @GetMapping("/room/favorite/{email}")
    @ApiOperation(value = "스터디룸 즐겨찾기 목록 조회", notes = "로그인한 이메일의 스터디룸 즐겨찾기 목록 조회")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "즐겨찾기 목록이 존재하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponse> getUserLikeRoom(@PathVariable("email") String email) {
        List<UserLikeRoom> userLikeRoomList = userLikeRoomService.findListByEmail(email);

        if(userLikeRoomList.isEmpty()) {
            return ResponseEntity.status(404).body(BaseResponse.of(404, "즐겨찾기 목록이 존재하지 않습니다"));
        }

        return ResponseEntity.status(200).body(FindUserLikeRoomListResponse.of(200, "성공", userLikeRoomList));
    }

    @PostMapping("/room/favorite")
    @ApiOperation(value = "스터디룸 즐겨찾기 추가", notes = "로그인한 이메일의 스터디룸 즐겨찾기 추가")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
            @ApiResponse(code=404, message = "방이 존재하지 않습니다"),
            @ApiResponse(code=409, message = "이미 즐겨찾기에 등록된 방입니다"),
            @ApiResponse(code=500, message = "즐겨찾기 등록에 실패했습니다"),
    })
    public ResponseEntity<? extends BaseResponse> addUserLikeRoom(@RequestBody UserLikeRoomRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if(user == null) {
            return ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        }

        Room room = roomService.findById(request.getRoomId());
        if(room == null) {
            return ResponseEntity.status(404).body(BaseResponse.of(404,"방이 존재하지 않습니다"));
        }

        if(userLikeRoomService.duplicatedRoomId(request)) {
            return ResponseEntity.status(409).body(BaseResponse.of(409,"이미 즐겨찾기에 등록된 방입니다"));             /////////////// 에러코드 확인
        }

        Long id = userLikeRoomService.addUserLikeRoom(user, room);

        if(userLikeRoomService.checkUserLikeRoom(id) == null) {
            return ResponseEntity.status(500).body(BaseResponse.of(500, "즐겨찾기 등록에 실패했습니다"));
        }

        return ResponseEntity.status(200).body(AddUserLikeRoomResponse.of(200,"성공", id));
    }

    @DeleteMapping("/room/favorite/{id}")
    @ApiOperation(value = "스터디룸 즐겨찾기 삭제", notes = "로그인한 이메일의 스터디룸 즐겨찾기 삭제")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "즐겨찾기 목록이 삭제되지 않았습니다"),
    })

    public ResponseEntity<? extends BaseResponse> delUserLikeRoom(@PathVariable("id") Long id) {
        userLikeRoomService.removeUserLikeRoom(id);
        UserLikeRoom userLikeRoom = userLikeRoomService.checkUserLikeRoom(id);

        if(userLikeRoom != null) {
            return ResponseEntity.status(500).body(BaseResponse.of(500, "즐겨찾기 목록이 삭제되지 않았습니다"));
        }
        return ResponseEntity.status(200).body(BaseResponse.of(200,"성공"));
    }
}
