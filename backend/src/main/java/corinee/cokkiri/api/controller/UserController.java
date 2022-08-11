package corinee.cokkiri.api.controller;

import corinee.cokkiri.api.service.EmailService;
import corinee.cokkiri.common.BaseResponse;
import corinee.cokkiri.db.domain.Email;
import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.api.request.UpdateNicknameRequest;
import corinee.cokkiri.api.request.UpdatePasswordRequest;
import corinee.cokkiri.api.request.UserLoginRequest;
import corinee.cokkiri.api.request.AddUserRequest;
import corinee.cokkiri.api.response.GetUserResponse;
import corinee.cokkiri.api.response.GetTokenResponse;
import corinee.cokkiri.api.response.UserLoginResponse;
import corinee.cokkiri.api.service.UserService;
import corinee.cokkiri.common.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Api(value = "유저 API", tags = {"User"})
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final EmailService emailService;

    @ApiOperation(value = "로그인", notes = "이메일과 비밀번호를 통해 로그인")
    @PostMapping("/user")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=403, message = "비밀번호가 일치하지 않습니다"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
            @ApiResponse(code=500, message = "토큰 넣는 도중 오류 발생"),
    })
    public ResponseEntity<? extends BaseResponse> loginUser(@RequestBody @Valid UserLoginRequest request, HttpServletResponse response){
        String email = request.getEmail();
        String password = request.getPassword();

        User user =userService.findByEmail(email);

        if(user == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        else if (!password.equals(user.getPassword()))
            return ResponseEntity.status(403).body(BaseResponse.of(403,"비밀번호가 일치하지 않습니다"));

        String accessToken = jwtTokenUtil.createAccessToken("email",user.getEmail());
        String refreshToken = jwtTokenUtil.createRefreshToken("email",user.getEmail());

        User changedUser = userService.setRefreshToken(user.getEmail(), refreshToken);

        if(!changedUser.getRefreshToken().equals(refreshToken))
            return ResponseEntity.status(500).body(BaseResponse.of(500,"토큰 넣는 도중 오류 발생"));

        Cookie cookie = new Cookie("refresh-token",refreshToken);
        cookie.setMaxAge(365*24*60*60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok(UserLoginResponse.of(200,"success", accessToken,  user.getEmail()));

    }

    @ApiOperation(value = "로그아웃")
    @GetMapping("/user/{email}")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
            @ApiResponse(code=500, message = "리프레쉬 토큰 삭제중 오류 발생"),
    })
    public ResponseEntity<BaseResponse> logoutUser(@PathVariable("email") String email){
        User user = userService.delRefreshToken(email);

        if(user == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        else if(!user.getRefreshToken().equals(""))
            return ResponseEntity.status(500).body(BaseResponse.of(500,"리프레쉬 토큰 삭제중 오류 발생"));
        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));

    }

    @ApiOperation(value = "회원정보 조회", notes = "이메일을 통해 회원정보 조회")
    @GetMapping("/user/info/{email}")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=403, message = "비밀번호가 일치하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponse> getUser(@PathVariable("email") String email) {
        User findUser = userService.findByEmail(email);
        if (findUser == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        else
            return ResponseEntity.status(200).body(GetUserResponse.of(200,"success",findUser));
    }

    @ApiOperation(value = "AccessToken 재발급", notes = "로그인유저의 AccessToken 재발급")
    @GetMapping("/user/refreshtoken/{email}")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=401, message = "일치하지 않는 토큰입니다"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponse> getToken(@PathVariable("email") String email, @CookieValue(value = "refresh-token", required = false) Cookie cookie){

        String refreshToken = cookie.getValue();
        User user = userService.findByEmail(email);
        if(user == null)
            return ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        if(!jwtTokenUtil.verifyToken(refreshToken) || !refreshToken.equals(user.getRefreshToken()))
            return ResponseEntity.status(401).body(BaseResponse.of(401,"리프레쉬토큰이 만료되었습니다"));

        String accessToken = jwtTokenUtil.createAccessToken("email",user.getEmail());
        return ResponseEntity.ok(GetTokenResponse.of(200,"success", accessToken, user.getEmail()));
    }

    @ApiOperation(value = "nickname 변경", notes = "로그인유저의 nickname 변경")
    @PatchMapping("/user/nickname")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
            @ApiResponse(code=500, message = "닉네임이 정상적으로 수정 되지 않았습니다"),
    })
    public ResponseEntity<? extends BaseResponse> updateNickname(
            @RequestBody @Valid UpdateNicknameRequest request) {

        User findUser = userService.updateNickname(request.getEmail(), request.getNickname());
        if (findUser == null)
            return  ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        else if (!findUser.getNickname().equals(request.getNickname())){
            return ResponseEntity.status(500).body(BaseResponse.of(500,"닉네임이 정상적으로 수정 되지 않았습니다"));
        }
        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));
    }

    @ApiOperation(value = "password 변경", notes = "로그인유저의 password 변경")
    @PatchMapping("/user/pw")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=404, message = "유저가 존재하지 않습니다"),
            @ApiResponse(code=500, message = "비밀번호가 정상적으로 수정 되지 않았습니다"),
    })
    public ResponseEntity<? extends BaseResponse> updatePassword(
            @RequestBody @Valid UpdatePasswordRequest request) {

        User findUser = userService.updatePassword(request.getEmail(), request.getPassword());
        if (findUser == null)
            return  ResponseEntity.status(404).body(BaseResponse.of(404,"유저가 존재하지 않습니다"));
        else if (!findUser.getPassword().equals(request.getPassword()))
            return ResponseEntity.status(500).body(BaseResponse.of(500,"비밀번호가 정상적으로 수정 되지 않았습니다"));
        return ResponseEntity.status(200).body(BaseResponse.of(200,"success"));
    }

    @ApiOperation(value = "회원가입", notes = "이메일 중복 검사 이후 회원가입")
    @PostMapping("/user/new")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=401, message = "인증번호 불일치"),
            @ApiResponse(code=409, message = "이미 존재하는 이메일"),
    })
    public ResponseEntity<? extends BaseResponse> addUser(@RequestBody AddUserRequest request) {
        Email findEmail = emailService.findByEmail(request.getEmail());

        if(!findEmail.getAuthToken().equals(request.getAuthToken())){
            return ResponseEntity.status(401).body(BaseResponse.of(401, "인증번호가 일치하지 않습니다"));
        }
        User user = userService.findByEmail(request.getEmail());

        if(user != null) {
            return ResponseEntity.status(409).body(BaseResponse.of(409, "이미 존재하는 이메일"));
        }

        userService.addUser(request);
        return ResponseEntity.status(200).body(BaseResponse.of(200, "회원가입 성공"));

    }

    @ApiOperation(value = "회원탈퇴")
    @DeleteMapping("/user/secession/{email}")
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=500, message = "회원탈퇴가 정상적으로 이루어지지 않았습니다"),
    })
    public ResponseEntity<? extends BaseResponse> delUser(@PathVariable("email") String email) {
        userService.delUser(email);
        User user = userService.findByEmail(email);
        if (user != null)
            return ResponseEntity.status(500).body(BaseResponse.of(
                    500, "회원탈퇴가 정상적으로 이루어지지 않았습니다"));
        else {
            return ResponseEntity.status(200).body(BaseResponse.of(
                    200, "회원 탈퇴 성공"));
        }
    }
}