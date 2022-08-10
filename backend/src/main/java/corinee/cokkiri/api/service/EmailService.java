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
        Optional<Email> optFindEmail = emailRepository.findByEmail(email);
        Email emailObj = null;

        if(optFindEmail.isPresent()) {
            emailObj = optFindEmail.get();
        }

        return emailObj;
    }

    public void deleteEmail(String email) {
        Optional<Email> optFindEmail = emailRepository.findByEmail(email);
        Email emailObj = null;

        if(optFindEmail.isPresent()) {
            emailObj = optFindEmail.get();
            emailRepository.delete(emailObj);
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

    public void addEmailEntity(String email) {
        Optional<User> optFindUser = userRepository.findByEmail(email);

        if(optFindUser.isPresent()) {
            Email emailObj = new Email();
            emailObj.setUser(optFindUser.get());
            emailObj.setAuthToken(makeAuthToken());
            emailObj.setGenerateTime(LocalDateTime.now());

            emailRepository.save(emailObj);
        }


    }

    public Email sendMessage(String email) {

        Optional<Email> optFindEmail = emailRepository.findByEmail(email);
        Email emailObj = null;

        if(optFindEmail.isPresent()) {
            emailObj = optFindEmail.get();

            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("noreply@cokkiri");
            message.setTo(emailObj.getUser().getEmail());
            message.setSubject("Cokkiri 회원 인증 번호");
            message.setText("Cokkiri 인증번호 : " + emailObj.getAuthToken());

            javaMailSender.send(message);
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

    public Email updateAuthState(String email) {
        Optional<Email> optFindEmail = emailRepository.findByEmail(email);
        Email emailObj = null;

        if(optFindEmail.isPresent()) {
            emailObj = optFindEmail.get();
            LocalDateTime currentTime = LocalDateTime.now();

            if(currentTime.compareTo(emailObj.getGenerateTime().plusMinutes(3)) <= 0) {
                changeAuthState(email);
            }
        }

        return emailObj;
    }
}
