package corinee.cokkiri.api.controller;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Room;
import corinee.cokkiri.api.request.CreateRoomRequest;
import corinee.cokkiri.api.request.EnterRoomRequest;
import corinee.cokkiri.api.request.ExitRoomRequest;
import corinee.cokkiri.api.response.CreateRoomResponse;
import corinee.cokkiri.api.response.EnterRoomResponse;
import corinee.cokkiri.api.response.FindRoomListResponse;
import corinee.cokkiri.api.response.FindRoomResponse;
import corinee.cokkiri.api.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(value = "스터디룸 API", tags = {"Room"})
public class RoomController {

    private final RoomService roomService;

    @ApiOperation(value = "스터디룸 생성", notes = "스터디룸 생성")
    @PostMapping("/room/new")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=409, message = "이미 사용중인 방 제목 입니다"),
            @ApiResponse(code=500, message = "스터디룸 생성에 실패했습니다"),
    })
    public ResponseEntity<? extends BaseResponse> addRoom(@RequestBody CreateRoomRequest request) {
        Long roomId = roomService.createRoom(request);
        if (roomId == null)
            return ResponseEntity.status(500).body(BaseResponse.of(500, "스터디룸 생성에 실패했습니다"));
        if (roomId == -1)
            return ResponseEntity.status(409).body(BaseResponse.of(409, "이미 사용중인 방 제목 입니다"));
        return ResponseEntity.status(200).body(CreateRoomResponse.of(200, "스터디룸 생성에 성공했습니다", roomId));
    }

    @ApiOperation(value = "스터디룸 목록 조회", notes = "[offset : 페이지 시작점]    [limit : 1페이당 정보 개수]")
    @GetMapping("/room")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=204, message = "스터디룸이 존재하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponse> getRoomList(@RequestParam("offset") int offset,
                                                               @RequestParam("limit") int limit,
                                                               @RequestParam(required = false, value = "keyword") String keyword) {

        List<Room> roomList = roomService.findRoomList(offset, limit, keyword);
        if (roomList == null || roomList.size() == 0)
            return ResponseEntity.status(204).body(BaseResponse.of(204, "스터디룸이 존재하지 않습니다"));
        return ResponseEntity.status(200).body(FindRoomListResponse.of(200, "스터디룸 목록 조회 성공", roomList));
    }

    @ApiOperation(value = "스터디룸 상세 조회", notes = "스터디룸 상세 조회")
    @GetMapping("/room/{room_id}")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "스터디룸이 존재하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponse> getRoom(@PathVariable("room_id") Long roomId) {
        Room room =  roomService.findById(roomId);
        if (room == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404, "스터디룸이 존재하지 않습니다"));
        return ResponseEntity.status(200).body(FindRoomResponse.of(200, "스터디룸 목록 조회 성공",
                room));
    }

    @ApiOperation(value = "스터디룸 입장", notes = "Response 로 응답된 [정수 index] 저장, 스터디룸 퇴장 요청 때 다시 전달 해주세요")
    @PostMapping("/room/entrance")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=500, message = "스터디룸 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponse> enterRoom(@RequestBody @Valid EnterRoomRequest request) {

        Long id = roomService.enterRoom(request);
        if (id == -1L)
            return ResponseEntity.status(404).body(BaseResponse.of(404, "유저가 존재하지 않습니다"));
        if (id == -2L)
            return ResponseEntity.status(404).body(BaseResponse.of(404, "방이 존재하지 않습니다"));
        if (id == -3L)
            return ResponseEntity.status(405).body(BaseResponse.of(405, "방이 가득찼습니다"));

        return ResponseEntity.status(200).body(EnterRoomResponse.of(200, "스터디룸 입장 성공", id));
    }

    @ApiOperation(value = "스터디룸 퇴장", notes = "enterRoom 에서 받은 [정수 index] 전달해주세요")
    @PostMapping("/room/exit")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=500, message = "스터디룸 입장 실패"),
    })
    public ResponseEntity<? extends BaseResponse> exitRoom(@RequestBody @Valid ExitRoomRequest request) {
        if (roomService.exitRoom(request))
            return ResponseEntity.status(200).body(BaseResponse.of(200, "스터디룸 퇴장 성공"));
        else
            return ResponseEntity.status(500).body(BaseResponse.of(500, "스터디룸 퇴장 실패"));
    }

}
