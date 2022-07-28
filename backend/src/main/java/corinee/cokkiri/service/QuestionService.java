package corinee.cokkiri.service;

import corinee.cokkiri.domain.Question;
import corinee.cokkiri.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;

    public List<Question> getQuestionList(Long roomId){
        Optional<List<Question>> optQuesitonList = questionRepository.getQuestionList(roomId);
        List<Question> questionList = null;
        if(optQuesitonList.isPresent()){
            questionList = optQuesitonList.get();
        }

        return questionList;
    }
}
