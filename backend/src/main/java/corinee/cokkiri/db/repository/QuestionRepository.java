package corinee.cokkiri.db.repository;

import corinee.cokkiri.db.domain.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QuestionRepository {

    private final EntityManager em;

    public List<Question> getQuestionList(Long roomId){
        return em.createQuery("select q from Question q where q.room.roomId=:roomId", Question.class)
                .setParameter("roomId",roomId)
                .getResultList();
    }

    public Long save(Question question){
        em.persist(question);

        return question.getQuestionId();
    }

    public Question getQuestion(Long questionId){
        return em.find(Question.class, questionId);
    }

    public void removeQuestion(Question question){em.remove(question);}
}
