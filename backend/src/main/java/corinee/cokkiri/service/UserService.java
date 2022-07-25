package corinee.cokkiri.service;

import corinee.cokkiri.domain.User;
import corinee.cokkiri.repository.UserRepository;
import corinee.cokkiri.request.UserSignupRequest;
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
        Optional<User> optFindUser = userRepository.findByEmail(email);
        User findUser = null;
        if(optFindUser.isPresent()) {
            findUser = optFindUser.get();
        }

        return findUser;
    }

    public User setRefreshToken(String email, String refreshToken) {
        Optional<User> optFindUser = userRepository.findByEmail(email);
        User user = null;
        if (optFindUser.isPresent()) {
            user = optFindUser.get();
            user.setRefreshToken(refreshToken);
        }

        return user;
    }

    public User removeRefreshToken(String email){
        Optional<User> optFindUser = userRepository.findByEmail(email);
        User user = null;
        if(optFindUser.isPresent()){
            user = optFindUser.get();
            user.setRefreshToken("");
        }

        return user;
    }

    public User updateNickname(String email, String nickname) {
        Optional<User> optUser = userRepository.findByEmail(email);
        User user = null;

        if(optUser.isPresent()) {
            user = optUser.get();
            user.setNickname(nickname);
        }

        return user;
    }

    public User updatePassword(String email, String password) {
        Optional<User> optUser = userRepository.findByEmail(email);
        User user = null;

        if(optUser.isPresent()) {
            user = optUser.get();
            user.setPassword(password);
        }

        return user;
    }

    public void addUser(UserSignupRequest userSignupRequest) {
        User user = new User();
        user.setEmail(userSignupRequest.getEmail());
        user.setPassword(userSignupRequest.getPassword());
        user.setNickname(userSignupRequest.getNickname());
        user.setAuthState(false);

        userRepository.save(user);
    }

    public void deleteUser(String email) {
        userRepository.deleteUser(email);
    }
}
