package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.Answer;
import corinee.cokkiri.db.repository.AnswerRepository;
import corinee.cokkiri.db.repository.QuestionRepository;
import corinee.cokkiri.db.repository.RoomRepository;
import corinee.cokkiri.db.repository.UserRepository;
import corinee.cokkiri.api.request.AddAnswerRequest;
import corinee.cokkiri.api.request.UpdateAnswerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;


    public List<Answer> findListById(Long questionId){
        return answerRepository.findListById(questionId);
    }
    public Long addAnswer(AddAnswerRequest request){
        Answer answer = new Answer();
        answer.setContent(request.getContent());
        answer.setQuestion(questionRepository.findById(request.getQuestionId()));
        answer.setRoom(roomRepository.findById(request.getRoomId()));
        answer.setUser(userRepository.findByEmail(request.getAnswerWriterEmail()).get());
        answer.setCode(request.getCode());
        answer.setLanguage(request.getLanguage());
        return answerRepository.add(answer);
    }

    public Answer findById(Long answerId){return answerRepository.findById(answerId);}

    public Answer updateAnswer(UpdateAnswerRequest request){
        Answer answer = answerRepository.findById(request.getAnswerId());

        if(answer == null) return null;

        answer.setContent(request.getContent());
        answer.setCode(request.getCode());
        answer.setLanguage(request.getLanguage());

        return answer;
    }

    public void delAnswer(Long answerId){
        Answer answer = answerRepository.findById(answerId);
        answerRepository.del(answer);
    }

}
