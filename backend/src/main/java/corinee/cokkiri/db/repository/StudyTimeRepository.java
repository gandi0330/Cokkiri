package corinee.cokkiri.db.repository;

import corinee.cokkiri.db.domain.StudyTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class StudyTimeRepository {

    private final EntityManager em;

    public Optional<List<StudyTime>> findByEmail(String email, LocalDateTime startDatetime, LocalDateTime endDatetime) {
        return Optional.ofNullable(em.createQuery(
                " SELECT s FROM StudyTime s " +
                        " WHERE s.user.email = :email " +
                        " and s.endDatetime is not null " +
                        " and s.startDatetime > :startDatetime " +
                        " and s.endDatetime < :endDatetime ", StudyTime.class)
                        .setParameter("email", email)
                        .setParameter("startDatetime", startDatetime)
                        .setParameter("endDatetime", endDatetime)
                        .getResultList());
    }

    public Optional<StudyTime> findById(Long id) {
        StudyTime studyTime = em.find(StudyTime.class, id);

        return Optional.ofNullable(studyTime);
    }

    public Long add(StudyTime studyTime) {
        em.persist(studyTime);
        StudyTime findStudyTime = em.find(StudyTime.class, studyTime.getId());
        return findStudyTime.getId();
    }

}
