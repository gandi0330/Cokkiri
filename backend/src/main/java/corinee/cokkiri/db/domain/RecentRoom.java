package corinee.cokkiri.db.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class RecentRoom {
    @Id @GeneratedValue
    @Column(name = "id")
    private Long recentRoomId;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "room_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Room room;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "email")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    private LocalDateTime visitedTime;
}

