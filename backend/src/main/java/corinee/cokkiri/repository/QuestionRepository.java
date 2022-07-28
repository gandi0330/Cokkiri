package corinee.cokkiri.repository;

import corinee.cokkiri.domain.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class QuestionRepository {

    private final EntityManager em;

    public Optional<List<Question>> getQuestionList(Long roomId){
        return Optional.ofNullable(em.createQuery("select q from Question q where q.room.roomId=:roomId", Question.class)
                .setParameter("roomId",roomId)
                .getResultList());
    }

    public Long save(Question question){
        em.persist(question);

        return question.getQuestionId();
    }

    public Optional<Question> getQuestion(Long questionId){
        return Optional.ofNullable(em.find(Question.class, questionId));
    }
}
