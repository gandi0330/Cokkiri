package corinee.cokkiri.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Room {
    @Id
    private Long roomId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "leader_email", referencedColumnName = "email")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    private String title;
    private LocalDateTime createDatetime;
    private Long userLimit;
    private String password;
}
