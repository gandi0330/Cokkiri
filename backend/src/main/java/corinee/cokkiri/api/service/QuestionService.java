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

    public List<Question> getQuestionList(Long roomId){
        return questionRepository.getQuestionList(roomId);
    }

    public Long addQuestion(AddQuestionRequest addQuestionRequest){
        Question question = new Question();
        question.setRoom(roomRepository.findById(addQuestionRequest.getRoomId()));
        question.setContent(addQuestionRequest.getContent());
        question.setTitle(addQuestionRequest.getTitle());
        question.setUser(userRepository.findByEmail(addQuestionRequest.getEmail()).get());
        question.setCode(addQuestionRequest.getCode());
        question.setLanguage(addQuestionRequest.getLanguage());

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

        if(question == null) return null;

        question.setContent(request.getContent());
        question.setTitle(request.getTitle());
        question.setCode(request.getCode());
        question.setLanguage(request.getLanguage());

        return question;
    }
}
