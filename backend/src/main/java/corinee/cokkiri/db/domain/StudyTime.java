package corinee.cokkiri.db.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter @Setter
public class StudyTime {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "email")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
}
