package corinee.cokkiri.service;

import corinee.cokkiri.domain.StudyTime;
import corinee.cokkiri.repository.StudyTimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudyTimeService {

    private final StudyTimeRepository studyTimeRepository;

    public List<StudyTime> findListByEmail(String email) {
        Optional<List<StudyTime>> optStudyTimeList = studyTimeRepository.findByEmail(email);
        List<StudyTime> studyTimeList = null;

        if(optStudyTimeList.isPresent()) {
            studyTimeList = optStudyTimeList.get();
        }

        return studyTimeList;
    }

    public long calStudyTime(List<StudyTime> studyTimes) {
        long res = 0;
        for(StudyTime studyTime : studyTimes) {
            LocalDateTime startDateTime = studyTime.getStartDatetime();
            LocalDateTime endDateTime = studyTime.getEndDatetime();

            Duration duration = Duration.between(startDateTime, endDateTime);
            res += duration.getSeconds();
        }

        return res;
    }

    public void updateStartTime(Long id) {

        Optional<StudyTime> optFindStudyTime = studyTimeRepository.findById(id);
        StudyTime studyTime = null;

        if(optFindStudyTime.isPresent()) {
            studyTime = optFindStudyTime.get();

            studyTime.setStartDatetime(LocalDateTime.now());
        }
    }

    public void updateEndTime(Long id) {

        Optional<StudyTime> optFindStudyTime = studyTimeRepository.findById(id);
        StudyTime studyTime = null;

        if(optFindStudyTime.isPresent()) {
            studyTime = optFindStudyTime.get();

            studyTime.setEndDatetime(LocalDateTime.now());
        }
    }
}
