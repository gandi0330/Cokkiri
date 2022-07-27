package corinee.cokkiri.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Email {

    @Id
    private String email;

    private String authToken;
    private LocalDateTime generateTime;
}