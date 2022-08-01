package corinee.cokkiri.repository;

import corinee.cokkiri.domain.Answer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class AnswerRepository {
    private final EntityManager em;


    public Long save(Answer answer){
        em.persist(answer);

        return answer.getAnswerId();
    }

    public Answer getAnswer(Long answerId){
        return em.find(Answer.class, answerId);
    }

    public void removeAnswer(Answer answer){ em.remove(answer);}
}
