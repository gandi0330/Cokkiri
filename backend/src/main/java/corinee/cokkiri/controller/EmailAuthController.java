package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Email;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.request.EmailAuthRequest;
import corinee.cokkiri.service.EmailService;
import corinee.cokkiri.service.UserService;
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
    private final UserService userService;

    @ApiOperation(value = "인증번호 전송", notes = "입력받은 이메일로 인증번호를 전송")
    @PostMapping("/user/email")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "Email이 존재하지 않습니다")
    })
    public ResponseEntity<? extends Result> sendEmail(@RequestBody EmailAuthRequest emailAuthRequest) {
        Email email = emailService.findByEmail(emailAuthRequest.getEmail());
        if(email != null) {
            emailService.deleteEmail(emailAuthRequest.getEmail());
        }
        emailService.addEmailEntity(emailAuthRequest.getEmail());

        Email findEmail = emailService.sendMessage(emailAuthRequest.getEmail());
        if(findEmail == null) {
            return ResponseEntity.status(404).body(Result.of(404, "Email이 존재하지 않습니다"));
        }
        return ResponseEntity.status(200).body(Result.of(200, "이메일 전송 성공"));
    }

    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "Email이 존재하지 않습니다"),
            @ApiResponse(code=500, message = "인증이 정상적으로 이루어지지 않았습니다")
    })
    @ApiOperation(value = "이메일 인증", notes = "입력받은 인증번호를 DB와 비교하여 인증")
    @GetMapping("/user/email/{userEmail}/{authNumber}")
    public ResponseEntity<? extends Result> checkAuth(@PathVariable("userEmail") String email, @PathVariable("authNumber") String authNum) {
        Email findEmail = emailService.updateAuthState(email);
        User findUser = userService.findByEmail(email);

        if(findEmail == null)
            return ResponseEntity.status(404).body(Result.of(404, "Email이 존재하지 않습니다"));
        else if(!findUser.isAuthState() || !findEmail.getAuthToken().equals(authNum))
            return ResponseEntity.status(500).body(Result.of(500, "인증이 정상적으로 이루어지지 않았습니다"));

        return ResponseEntity.status(200).body(Result.of(200, "이메일 인증 성공"));
    }
}
