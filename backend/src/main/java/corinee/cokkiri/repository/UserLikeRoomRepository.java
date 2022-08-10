package corinee.cokkiri.repository;

import corinee.cokkiri.domain.Question;
import corinee.cokkiri.domain.UserLikeRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserLikeRoomRepository {

    private final EntityManager em;

    public List<UserLikeRoom> findListByEmail(String email) {
        return em.createQuery("SELECT u FROM UserLikeRoom u WHERE u.user.email = :email", UserLikeRoom.class)
                .setParameter("email", email)
                .getResultList();
    }

    public Long save(UserLikeRoom userLikeRoom) {
        em.persist(userLikeRoom);

        return userLikeRoom.getId();
    }

    public UserLikeRoom findById(Long id) {
        return em.find(UserLikeRoom.class, id);
    }

    public void removeUserLikeRoom(UserLikeRoom userLikeRoom) {
        em.remove(userLikeRoom);
    }
}
