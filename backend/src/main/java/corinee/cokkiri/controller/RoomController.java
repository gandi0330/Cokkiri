package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Room;
import corinee.cokkiri.request.CreateRoomRequest;
import corinee.cokkiri.response.FindRoomListResponse;
import corinee.cokkiri.service.RoomService;
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
@Api(value = "스터디룸 API", tags = {"Room"})
@CrossOrigin("*")
public class RoomController {

    private final RoomService roomService;

    @ApiOperation(value = "스터디룸 생성", notes = "스터디룸 생성")
    @PostMapping("/room/new")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=409, message = "이미 사용중인 방 제목 입니다"),
            @ApiResponse(code=500, message = "스터디룸 생성에 실패했습니다"),
    })
    public ResponseEntity<? extends Result> createRoom(@RequestBody CreateRoomRequest request) {
        Long roomId = roomService.createRoom(request);
        if (roomId == null)
            return ResponseEntity.status(500).body(Result.of(500, "스터디룸 생성에 실패했습니다"));
        if (roomId == -1)
            return ResponseEntity.status(409).body(Result.of(409, "이미 사용중인 방 제목 입니다"));
        return ResponseEntity.status(200).body(Result.of(200, "스터디룸 생성에 성공했습니다"));
    }

    @ApiOperation(value = "스터디룸 목록 조회", notes = "[offset : 페이지 시작점]    [limit : 1페이당 정보 개수]")
    @GetMapping("room/{offset}/{limit}")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "스터디룸이 존재하지 않습니다"),
    })
    public ResponseEntity<? extends Result> findRoomList(@PathVariable("offset") int offset,
                                                         @PathVariable("limit") int limit) {
        List<Room> roomList = roomService.findRoomList(offset, limit);
        if (roomList.size() == 0)
            return ResponseEntity.status(404).body(Result.of(404, "스터디룸이 존재하지 않습니다"));
        return ResponseEntity.status(200).body(FindRoomListResponse.of(200, "스터디룸 목록 조회 성공", roomList));
    }
}
