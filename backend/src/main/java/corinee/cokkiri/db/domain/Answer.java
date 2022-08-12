package corinee.cokkiri.db.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Setter @Getter
public class Answer {
    @Id @GeneratedValue
    private long answerId;

    @ManyToOne
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="question_id")
    Question question;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "room_id")
    Room room;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "answer_writer_email", referencedColumnName = "email")
    User user;

    @Size(max = 3000)
    private String content;
    private String language;

    @Size(max = 3000)
    private String code;
    private LocalDateTime createDatetime;

    public Answer(){
        super();
        this.createDatetime = LocalDateTime.now();
    };


}
