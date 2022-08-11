package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.RecentRoom;
import corinee.cokkiri.db.domain.Room;
import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.db.repository.RecentRoomRepository;
import corinee.cokkiri.api.request.RecentRoomRequest;
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

    public boolean duplicatedRoomId(RecentRoomRequest request) {
        List<RecentRoom> recentRoomList = findListByEmail(request.getEmail());

        for(RecentRoom recentRoom : recentRoomList) {
            if(recentRoom.getRoom().getRoomId() == request.getRoomId()) {
                recentRoomRepository.setVisitedTime(recentRoom.getRecentRoomId());
                return true;
            }
        }

        return false;
    }

    public Long addRecentRoom(User user, Room room) {
        RecentRoom recentRoom = new RecentRoom();
        recentRoom.setUser(user);
        recentRoom.setRoom(room);
        recentRoom.setVisitedTime(LocalDateTime.now());

        return recentRoomRepository.add(recentRoom);
    }

    public void delRecentRoom(RecentRoom recentRoom) {
        recentRoomRepository.del(recentRoom);
    }

    public RecentRoom checkRecentRoom(Long recentRoomId) {
        return recentRoomRepository.findById(recentRoomId);
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