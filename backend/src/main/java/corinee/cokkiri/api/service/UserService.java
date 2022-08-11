package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.db.repository.UserRepository;
import corinee.cokkiri.api.request.AddUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public User findByEmail(String email) {
        User findUser = userRepository.findByEmail(email);

        return findUser;
    }

    public User setRefreshToken(String email, String refreshToken) {
        User findUser = userRepository.findByEmail(email);

        if (findUser != null) {
            findUser.setRefreshToken(refreshToken);
        }

        return findUser;
    }

    public User delRefreshToken(String email){
        User findUser = userRepository.findByEmail(email);

        if(findUser != null){
            findUser.setRefreshToken("");
        }

        return findUser;
    }

    public User updateNickname(String email, String nickname) {
        User findUser = userRepository.findByEmail(email);

        if(findUser != null) {
            findUser.setNickname(nickname);
        }

        return findUser;
    }

    public User updatePassword(String email, String password) {
        User findUser = userRepository.findByEmail(email);

        if(findUser != null) {
            findUser.setPassword(password);
        }

        return findUser;
    }

    public void addUser(AddUserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setNickname(request.getNickname());
        user.setAuthState(false);

        userRepository.add(user);
    }

    public void delUser(String email) {
        User findUser = userRepository.findByEmail(email);
        if (findUser != null) {
            userRepository.del(findUser);
        }
    }
}
