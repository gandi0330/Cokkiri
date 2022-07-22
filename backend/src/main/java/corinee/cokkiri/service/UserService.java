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
        System.out.println("서비스 왔다"+email);
        Optional<User> optFindUser = userRepository.findById(email);
        User findUser = null;
        if(optFindUser.isPresent()) {
            findUser = optFindUser.get();
        }

//        User findUser = new User();
//        findUser.setEmail("test@test.com");
//        findUser.setPassword("qwerty!@#$%");
//        findUser.setNickname("testUser");

        System.out.println("서비스 리턴 값은 "+findUser);
        return findUser;
    }
}
