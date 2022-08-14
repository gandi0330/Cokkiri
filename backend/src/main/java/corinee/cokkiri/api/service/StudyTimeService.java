package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.StudyTime;
import corinee.cokkiri.db.repository.StudyTimeRepository;
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

    public List<StudyTime> findListByEmail(String email, LocalDateTime startDatetime, LocalDateTime endDatetime) {
        List<StudyTime> studyTimeList = studyTimeRepository.findListByEmail(email, startDatetime, endDatetime);

        return studyTimeList;
    }

    public Long calStudyTime(List<StudyTime> studyTimeList) {
        Long res = 0L;
        for(StudyTime studyTime : studyTimeList) {
            LocalDateTime startDateTime = studyTime.getStartDatetime();
            LocalDateTime endDateTime = studyTime.getEndDatetime();

            Duration duration = Duration.between(startDateTime, endDateTime);
            res += duration.getSeconds();
        }

        return res;
    }
}
