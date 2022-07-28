package corinee.cokkiri.service;

import corinee.cokkiri.domain.Question;
import corinee.cokkiri.repository.QuestionRepository;
import corinee.cokkiri.repository.RoomRepository;
import corinee.cokkiri.repository.UserRepository;
import corinee.cokkiri.request.QuestionAddRequest;
import corinee.cokkiri.request.UpdateQuestionRequest;
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
        return questionRepository.getQuestionList(roomId);
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
        return questionRepository.getQuestion(questionId);
    }

    public void removeQuestion(Long questionId){
        Question question= questionRepository.getQuestion(questionId);

        questionRepository.removeQuestion(question);
    }

    public Question updateQuestion(UpdateQuestionRequest request){
        Question question = questionRepository.getQuestion(request.getQuestionId());

        question.setContent(request.getContent());
        question.setTitle(request.getTitle());

        return question;
    }
}
