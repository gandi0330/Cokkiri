package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.Email;
import corinee.cokkiri.request.EmailAuthRequest;
import corinee.cokkiri.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class EmailAuthController {
    private final EmailService emailService;

    @PostMapping("/user/email")
    public ResponseEntity<? extends Result> sendEmail(@RequestBody EmailAuthRequest emailAuthRequest) {
        Email email = emailService.findByEmail(emailAuthRequest.getEmail());
        if(email != null) {
            emailService.deleteEmail(emailAuthRequest.getEmail());
        }
        emailService.addEmailEntity(emailAuthRequest.getEmail());

        Email findEmail = emailService.sendMessage(emailAuthRequest.getEmail());
        if(findEmail == null) {
            return ResponseEntity.status(404).body(Result.of(404, "Email이 존재하지 않습니다."));
        }
        return ResponseEntity.status(200).body(Result.of(200, "이메일 전송 성공"));
    }

    @GetMapping("/user/email/{userEmail}/{authNumber}")
    public ResponseEntity<? extends Result> checkAuth(@PathVariable("userEmail") String email, @PathVariable("authNumber") String authNum) {
        Email findEmail = emailService.updateAuthState(email);

        if(findEmail == null)
            return ResponseEntity.status(404).body(Result.of(404, "Email이 존재하지 않습니다."));
        else if(!findEmail.getAuthToken().equals(authNum))
            return ResponseEntity.status(500).body(Result.of(500, "인증이 정상적으로 이루어지지 않았습니다."));
        return ResponseEntity.status(200).body(Result.of(200, "이메일 인증 성공"));
    }
}
