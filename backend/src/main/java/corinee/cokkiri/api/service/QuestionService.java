package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.Question;
import corinee.cokkiri.db.repository.QuestionRepository;
import corinee.cokkiri.db.repository.RoomRepository;
import corinee.cokkiri.db.repository.UserRepository;
import corinee.cokkiri.api.request.AddQuestionRequest;
import corinee.cokkiri.api.request.UpdateQuestionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final RoomRepository roomRepository;

    private final UserRepository userRepository;

    public List<Question> findListById(Long roomId){
        return questionRepository.findListById(roomId);
    }

    public Long addQuestion(AddQuestionRequest request){
        Question question = new Question();
        question.setRoom(roomRepository.findById(request.getRoomId()));
        question.setContent(request.getContent());
        question.setTitle(request.getTitle());
        question.setUser(userRepository.findByEmail(request.getEmail()));
        question.setCode(request.getCode());
        question.setLanguage(request.getLanguage());

        return questionRepository.add(question);
    }

    public Question findById(Long questionId){
        return questionRepository.findById(questionId);
    }

    public void delQuestion(Long questionId){
        Question question= questionRepository.findById(questionId);

        questionRepository.del(question);
    }

    public Question updateQuestion(UpdateQuestionRequest request){
        Question question = questionRepository.findById(request.getQuestionId());

        if(question == null) return null;

        question.setContent(request.getContent());
        question.setTitle(request.getTitle());
        question.setCode(request.getCode());
        question.setLanguage(request.getLanguage());

        return question;
    }
}
