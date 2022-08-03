package corinee.cokkiri.repository;

import corinee.cokkiri.domain.RecentRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RecentRoomRepository {
    private final EntityManager em;

    public List<RecentRoom> findListByEmail(String email) {
        return em.createQuery("SELECT r FROM RecentRoom r WHERE r.user.email = :email", RecentRoom.class)
                .setParameter("email", email)
                .getResultList();
    }

    public Long save(RecentRoom recentRoom) {
        em.persist(recentRoom);

        return recentRoom.getRecentRoomId();
    }

    public LocalDateTime setVisitedTime(Long recentRoomId) {
        RecentRoom recentRoom = em.find(RecentRoom.class, recentRoomId);

        recentRoom.setVisitedTime(LocalDateTime.now());

        return recentRoom.getVisitedTime();
    }

    public RecentRoom getRecentRoom(Long recentRoomId) {
        return em.find(RecentRoom.class, recentRoomId);
    }

    public void removeRecentRoom(RecentRoom recentRoom) {
        em.remove(recentRoom);
    }
}
