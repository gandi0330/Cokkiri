package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.request.UpdateNicknameRequest;
import corinee.cokkiri.request.UserLoginRequest;
import corinee.cokkiri.response.FindUserResponse;
import corinee.cokkiri.response.GetTokenResponse;
import corinee.cokkiri.response.UserLoginResponse;
import corinee.cokkiri.service.UserService;
import corinee.cokkiri.util.JwtTokenUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/user")
    public ResponseEntity<? extends Result> loginUser(@RequestBody UserLoginRequest userLoginRequest){
        String email = userLoginRequest.getEmail();
        String password = userLoginRequest.getPassword();
        User user =userService.findByEmail(email);

        if(user == null){
            return ResponseEntity.status(404).body(Result.of(404,"유저가 존재하지 않습니다"));
        }

        if(!password.equals(user.getPassword())){
            return ResponseEntity.status(401).body(Result.of(401,"비밀번호가 일치하지 않습니다"));
        }

        String accessToken = jwtTokenUtil.createAccessToken("email",user.getEmail());
        String refreshToken = jwtTokenUtil.createRefreshToken("email",user.getEmail());

        User changedUser = userService.setRefreshToken(user.getEmail(), refreshToken);

        if(!changedUser.getRefreshToken().equals(refreshToken))
            return ResponseEntity.status(500).body(Result.of(500,"토큰 넣는 도중 오류 발생"));

        return ResponseEntity.ok(UserLoginResponse.of(200,"success", accessToken, refreshToken,  user.getEmail()));

    }

    @GetMapping("/user/info/{user_email}")
    public ResponseEntity<? extends Result> findUser(@PathVariable("user_email") String email) {
        User findUser = userService.findByEmail(email);
        if (findUser == null)
            return ResponseEntity.status(404).body(Result.of(404,"유저가 존재하지 않습니다"));
        else
            return ResponseEntity.status(200).body(FindUserResponse.of(200,"success",findUser));
    }


    @GetMapping("/user/refreshtoken/{user_email}")
    public ResponseEntity<? extends Result> getToken(@PathVariable("user_email") String email, HttpServletRequest request){
        User user = userService.findByEmail(email);
        if(user == null)
            return ResponseEntity.status(404).body(Result.of(404,"유저가 존재하지 않습니다"));

        if(!request.getHeader("X-refresh-token").equals(user.getRefreshToken()))
            return ResponseEntity.status(401).body(Result.of(401,"일치하지 않는 토큰입니다"));

        String accessToken = jwtTokenUtil.createAccessToken("email",user.getEmail());
        return ResponseEntity.ok(GetTokenResponse.of(200,"success", accessToken, user.getEmail()));
    }


    @PatchMapping("/user/nickname/{user_email}")
    public ResponseEntity<? extends Result> updateNickname(
            @PathVariable("user_email") String email,
            @RequestBody @Valid UpdateNicknameRequest request) {

        User findUser = userService.findByEmail(email);
        if (findUser == null)
            return  ResponseEntity.status(404).body(Result.of(404,"유저가 존재하지 않습니다"));

        userService.updateNickname(email, request.getNickname());
        return ResponseEntity.status(200).body(Result.of(200,"success"));
    }

}
