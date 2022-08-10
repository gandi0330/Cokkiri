package corinee.cokkiri.db.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Question {
    @Id @GeneratedValue
    private long questionId;

    @ManyToOne
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="room_id")
    Room room;

    @ManyToOne
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="question_writer_email", referencedColumnName = "email")
    User user;

    private String title;
    private String content;
    private String language;
    private String code;
    private LocalDateTime createDatetime;

    public Question(){
        super();
        this.createDatetime = LocalDateTime.now();
    };

}
