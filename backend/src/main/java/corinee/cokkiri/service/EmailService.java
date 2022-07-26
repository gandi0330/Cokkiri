package corinee.cokkiri.service;

import corinee.cokkiri.domain.Email;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.repository.EmailRepository;
import corinee.cokkiri.repository.UserRepository;
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

    public void addEmailEntity(String email) {
        Email emailObj = new Email();
        emailObj.setEmail(email);
        emailObj.setAuthToken(makeAuthToken());
        emailObj.setGenerateTime(LocalDateTime.now());

        emailRepository.save(emailObj);
    }

    public void sendMessage(String email) {

        Optional<Email> optFindEmail = emailRepository.findByEmail(email);
        Email emailObj = null;

        if(optFindEmail.isPresent()) {
            emailObj = optFindEmail.get();

            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("wow2867@gmail.com");
            message.setTo(emailObj.getEmail());
            message.setSubject("Cokkiri 회원 인증 번호");
            message.setText("Cokkiri 인증번호 : " + emailObj.getAuthToken());

            javaMailSender.send(message);
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

    public Email updateAuthState(String email) {
        Optional<Email> optFindEmail = emailRepository.findByEmail(email);
        Email emailObj = null;

        if(optFindEmail.isPresent()) {
            emailObj = optFindEmail.get();
            changeAuthState(email);
        }

        return emailObj;
    }

    public void changeAuthState(String email) {

        Optional<User> optFindUser = userRepository.findByEmail(email);
        User user = null;

        if(optFindUser.isPresent()) {
            user = optFindUser.get();
            user.setAuthState(true);
        }
    }
}
