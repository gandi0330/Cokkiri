package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.Email;
import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.db.repository.EmailRepository;
import corinee.cokkiri.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class EmailService {

    private final EmailRepository emailRepository;
    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;

    public Email findByEmail(String email) {
        return emailRepository.findByEmail(email);
    }

    public void delEmail(String email) {
        Email findEmail = emailRepository.findByEmail(email);

        if(findEmail != null) {
            emailRepository.del(findEmail);
        }
    }

    public String makeAuthToken() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for(int i = 0; i < 6; i++) {
            key.append(rnd.nextInt(8) + 1);
        }

        return key.toString();
    }

    public void addEmail(String email) {
        User findUser = userRepository.findByEmail(email);

        if(findUser != null) {
            Email emailObj = new Email();
            emailObj.setUser(findUser);
            emailObj.setAuthToken(makeAuthToken());
            emailObj.setGenerateTime(LocalDateTime.now());

            emailRepository.add(emailObj);
        }
    }

    public Email sendMessage(String email) {
        Email findEmail = emailRepository.findByEmail(email);

        if(findEmail != null) {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("noreply@cokkiri");
            message.setTo(findEmail.getUser().getEmail());
            message.setSubject("Cokkiri 회원 인증 번호");
            message.setText("Cokkiri 인증번호 : " + findEmail.getAuthToken());

            javaMailSender.send(message);
        }

        return findEmail;
    }

    public void changeAuthState(String email) {

        User findUser = userRepository.findByEmail(email);

        if(findUser != null) {
            findUser.setAuthState(true);
        }
    }

    public Email updateAuthState(String email) {
        Email findEmail = emailRepository.findByEmail(email);

        if(findEmail != null) {
            LocalDateTime currentTime = LocalDateTime.now();

            if(currentTime.compareTo(findEmail.getGenerateTime().plusMinutes(3)) <= 0) {
                changeAuthState(email);
            }
        }

        return findEmail;
    }
}
