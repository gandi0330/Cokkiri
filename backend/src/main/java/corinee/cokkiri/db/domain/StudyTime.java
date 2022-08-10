package corinee.cokkiri.db.domain;

import lombok.Getter;
import lombok.Setter;

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
    private User user;

    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
}
