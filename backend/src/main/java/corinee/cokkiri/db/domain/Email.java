package corinee.cokkiri.db.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Email implements Serializable {

    @Id
    @OneToOne
    @JoinColumn(name = "email")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    private String authToken;
    private LocalDateTime generateTime;
}