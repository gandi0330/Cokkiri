package corinee.cokkiri.api.controller;

import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Email;
import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.api.request.EmailAuthRequest;
import corinee.cokkiri.api.service.EmailService;
import corinee.cokkiri.api.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Api(value = "메일 인증 API", tags = {"EmailAuth"})
public class EmailAuthController {
    private final EmailService emailService;

    @ApiOperation(value = "인증번호 전송", notes = "입력받은 이메일로 인증번호를 전송")
    @PostMapping("/user/email")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "Email이 존재하지 않습니다")
    })
    public ResponseEntity<? extends BaseResponse> sendEmail(@RequestBody EmailAuthRequest request) {
        Email findEmail = emailService.findByEmail(request.getEmail());
        if(findEmail != null) {
            emailService.delEmail(request.getEmail());
        }
        emailService.addEmail(request.getEmail());

        Email sendEmail = emailService.sendMessage(request.getEmail());
        if(sendEmail == null) {
            return ResponseEntity.status(404).body(BaseResponse.of(404, "Email이 존재하지 않습니다"));
        }
        return ResponseEntity.status(200).body(BaseResponse.of(200, "이메일 전송 성공"));
    }

}
