package corinee.cokkiri.db.repository;

import corinee.cokkiri.db.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final EntityManager em;

    public Optional<User> findByEmail(String email) {
        User user = em.find(User.class, email);
        return Optional.ofNullable(user);
    }

    public void add(User info) {
        em.persist(info);
    }

    public void del(User user) {
        em.remove(user);
    }
}
