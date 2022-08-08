package corinee.cokkiri.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Room {
    @Id @GeneratedValue
    private Long roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader_email", referencedColumnName = "email")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;
    private String sessionId;
    private String title;
    private LocalDateTime createDatetime;
    private Long userLimit;
    private String password;
    private Long userCount;

    public Room() {

    }

    public Room(User user, String title, Long userLimit) {
        this.user = user;
        this.title = title;
        this.createDatetime = LocalDateTime.now();
        this.userLimit = userLimit;
    }
}
