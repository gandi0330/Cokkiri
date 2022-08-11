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

    public List<Question> findListById(Long roomId){
        return em.createQuery("select q from Question q where q.room.roomId=:roomId", Question.class)
                .setParameter("roomId",roomId)
                .getResultList();
    }

    public Long add(Question question){
        em.persist(question);

        return question.getQuestionId();
    }

    public Question findById(Long questionId){
        return em.find(Question.class, questionId);
    }

    public void del(Question question){em.remove(question);}
}
