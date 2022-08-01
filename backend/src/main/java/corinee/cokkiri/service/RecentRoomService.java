package corinee.cokkiri.service;

import corinee.cokkiri.domain.RecentRoom;
import corinee.cokkiri.repository.RecentRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RecentRoomService {

    private final RecentRoomRepository recentRoomRepository;

    public List<RecentRoom> findListByEmail(String email) {
        List<RecentRoom> recentRoomList = recentRoomRepository.findListByEmail(email);

        DateComparator comp = new DateComparator();
        Collections.sort(recentRoomList, comp);

        return recentRoomList;
    }
}


class DateComparator implements Comparator<RecentRoom> {
    @Override
    public int compare(RecentRoom first, RecentRoom second) {
        LocalDateTime firstDate = first.getVisitedTime();
        LocalDateTime secondDate = second.getVisitedTime();

        if(firstDate.compareTo(secondDate) < 0) {
            return 1;
        }
        return 0;
    }
}