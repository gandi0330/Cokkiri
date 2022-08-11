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

    public void addUser(AddUserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setNickname(request.getNickname());
        user.setAuthState(false);

        userRepository.save(user);
    }

    public void deleteUser(String email) {
        Optional<User> findUser = userRepository.findByEmail(email);
        if (findUser.isPresent()) {
            User user = findUser.get();
            userRepository.deleteUser(user);
        }
    }
}
