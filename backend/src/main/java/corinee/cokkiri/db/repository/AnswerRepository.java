package corinee.cokkiri.db.repository;

import corinee.cokkiri.db.domain.Answer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AnswerRepository {
    private final EntityManager em;


    public List<Answer> findListById(Long questionId){
        return em.createQuery("select a from Answer a where a.question.questionId=:questionId",Answer.class)
                .setParameter("questionId",questionId)
                .getResultList();
    }

    public Long add(Answer answer){
        em.persist(answer);

        return answer.getAnswerId();
    }

    public Answer findById(Long answerId){
        return em.find(Answer.class, answerId);
    }

    public void del(Answer answer){ em.remove(answer);}
}
