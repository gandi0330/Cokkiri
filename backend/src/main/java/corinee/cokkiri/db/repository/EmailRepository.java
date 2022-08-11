
package corinee.cokkiri.db.repository;

import corinee.cokkiri.db.domain.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class EmailRepository {

    private final EntityManager em;

    public Email findByEmail(String email) {
        Email emailObj = em.find(Email.class, email);

        return emailObj;
    }

    public void add(Email email) {
        em.persist(email);
    }

    public void del(Email email) {
        em.remove(email);
    }
}
