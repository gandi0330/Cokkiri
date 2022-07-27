package corinee.cokkiri.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter @Setter
public class UserLikeRoom {
    @Id
    @Column(name = "id")
    private Long UserLikeRoomId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Room room;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "email")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;
}
