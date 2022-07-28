package corinee.cokkiri.repository;

import corinee.cokkiri.domain.Room;
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

    public Long createRoom(Room room) {
        em.persist(room);
        Room findRoom = em.find(Room.class, room.getRoomId());
        return findRoom.getRoomId();
    }

    public List<Room> findByTitle(String title) {
        return em.createQuery("select r from Room r where r.title = :title", Room.class)
                .setParameter("title", title)
                .getResultList();
    }
}
