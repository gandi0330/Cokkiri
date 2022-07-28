package corinee.cokkiri.service;

import corinee.cokkiri.domain.Question;
import corinee.cokkiri.repository.QuestionRepository;
import corinee.cokkiri.repository.RoomRepository;
import corinee.cokkiri.repository.UserRepository;
import corinee.cokkiri.request.QuestionAddRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final RoomRepository roomRepository;

    private final UserRepository userRepository;

    public List<Question> getQuestionList(Long roomId){
        Optional<List<Question>> optQuesitonList = questionRepository.getQuestionList(roomId);
        List<Question> questionList = null;
        if(optQuesitonList.isPresent()){
            questionList = optQuesitonList.get();
        }

        return questionList;
    }

    public Long addQuestion(QuestionAddRequest questionAddRequest){
        Question question = new Question();
        question.setRoom(roomRepository.findById(questionAddRequest.getRoomId()));
        question.setContent(questionAddRequest.getContent());
        question.setTitle(questionAddRequest.getTitle());
        question.setUser(userRepository.findByEmail(questionAddRequest.getEmail()).get());

        return questionRepository.save(question);
    }

    public Question getQuestion(Long questionId){
        Optional<Question> optQuestion = questionRepository.getQuestion(questionId);

        Question question = null;

        if(optQuestion.isPresent()){
            question = optQuestion.get();
        }
        return question;
    }

    public void removeQuestion(Long questionId){
        Optional<Question> optQuestion = questionRepository.getQuestion(questionId);
        if(optQuestion.isPresent()){
            questionRepository.removeQuestion(optQuestion.get());
        }
    }
}
