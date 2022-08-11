package corinee.cokkiri.db.repository;

import corinee.cokkiri.db.domain.Room;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RoomRepository {

    private final EntityManager em;

    public Room findById(Long id) {
        Room room = em.find(Room.class, id);
        return room;
    }

    public Long add(Room room) {
        em.persist(room);
        Room findRoom = em.find(Room.class, room.getRoomId());

        return findRoom.getRoomId();
    }

    public List<Room> findListByTitle(String title) {
        return em.createQuery("select r from Room r where r.title = :title", Room.class)
                .setParameter("title", title)
                .getResultList();
    }

    public List<Room> findListByKeyword(int offset, int limit, String keyword) {
        if(keyword == null) return em.createQuery("select r from Room r", Room.class)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
        return em.createQuery("select r from Room r where r.title like :keyword", Room.class)
                .setParameter("keyword", "%" + keyword + "%")
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }

}
