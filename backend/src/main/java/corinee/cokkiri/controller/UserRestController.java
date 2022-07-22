package corinee.cokkiri.controller;

import corinee.cokkiri.common.Result;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.response.FindUserResponse;
import corinee.cokkiri.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;

    @GetMapping("/user/info/{user_email}")
    public ResponseEntity<? extends Result<FindUserResponse>> findUser(@PathVariable("user_email") String email) {
        User findUser = userService.findByEmail(email);
        FindUserResponse response = new FindUserResponse(findUser.getEmail(), findUser.getNickname());
        if (findUser.getEmail() == null)
            return ResponseEntity.status(404).body( new Result<>(404, response));
        else
            return ResponseEntity.status(200).body( new Result<>(200, response));
    }

}
