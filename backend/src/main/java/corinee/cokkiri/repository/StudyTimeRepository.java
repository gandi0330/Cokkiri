package corinee.cokkiri.repository;

import corinee.cokkiri.domain.StudyTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class StudyTimeRepository {

    private final EntityManager em;

    public Optional<List<StudyTime>> findByEmail(String email) {
        return Optional.ofNullable(em.createQuery("SELECT s FROM StudyTime s WHERE s.user.email = :email", StudyTime.class)
                .setParameter("email", email)
                .getResultList());
    }
}
