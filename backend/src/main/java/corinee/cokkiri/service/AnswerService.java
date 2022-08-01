package corinee.cokkiri.service;

import corinee.cokkiri.domain.Answer;
import corinee.cokkiri.domain.Question;
import corinee.cokkiri.repository.AnswerRepository;
import corinee.cokkiri.repository.QuestionRepository;
import corinee.cokkiri.repository.RoomRepository;
import corinee.cokkiri.repository.UserRepository;
import corinee.cokkiri.request.AnswerAddRequest;
import corinee.cokkiri.request.UpdateAnswerRequest;
import corinee.cokkiri.request.UpdateQuestionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public Long addAnswer(AnswerAddRequest answerAddRequest){
        Answer answer = new Answer();
        answer.setContent(answerAddRequest.getContent());
        answer.setTitle(answerAddRequest.getTitle());
        answer.setQuestion(questionRepository.getQuestion(answerAddRequest.getQuestionId()));
        answer.setRoom(roomRepository.findById(answerAddRequest.getRoomId()));
        answer.setUser(userRepository.findByEmail(answerAddRequest.getAnswerWriterEmail()).get());

        return answerRepository.save(answer);
    }

    public Answer getAnswer(Long answerId){return answerRepository.getAnswer(answerId);}

    public Answer updateAnswer(UpdateAnswerRequest request){
        Answer answer = answerRepository.getAnswer(request.getAnswerId());

        if(answer == null) return null;

        answer.setContent(request.getContent());
        answer.setTitle(request.getTitle());

        return answer;
    }

    public void removeAnswer(Long answerId){
        Answer answer = answerRepository.getAnswer(answerId);
        answerRepository.removeAnswer(answer);
    }

}
