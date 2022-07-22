package corinee.cokkiri.service;

import corinee.cokkiri.domain.User;
import corinee.cokkiri.repository.UserRepository;
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
        Optional<User> optFindUser = userRepository.findById(email);
        User findUser = null;
        if(optFindUser.isPresent()) {
            findUser = optFindUser.get();
        }

        return findUser;
    }

    public User setRefreshToken(String email, String refreshToken){
        Optional<User> optFindUser = userRepository.findById(email);
        User user = null;
        if(optFindUser.isPresent()){
            user = optFindUser.get();
            user.setRefreshToken(refreshToken);
        }

        return user;
        
    public void updateNickname(String email, String nickname) {
        Optional<User> optUser = userRepository.findById(email);
        User user = null;

        if(optUser.isPresent()) {
            user = optUser.get();
            user.setNickname(nickname);
        }
    }
}
