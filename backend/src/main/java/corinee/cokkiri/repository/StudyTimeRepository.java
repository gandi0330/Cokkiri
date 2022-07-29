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

    public Optional<StudyTime> findById(Long id) {
        StudyTime studyTime = em.find(StudyTime.class, id);

        return Optional.ofNullable(studyTime);
    }

    public Long save(StudyTime studyTime) {
        em.persist(studyTime);
        StudyTime findStudyTime = em.find(StudyTime.class, studyTime.getId());
        return findStudyTime.getId();
    }

}
