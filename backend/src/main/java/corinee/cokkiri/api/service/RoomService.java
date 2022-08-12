package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.Room;
import corinee.cokkiri.db.domain.StudyTime;
import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.db.repository.RoomRepository;
import corinee.cokkiri.db.repository.StudyTimeRepository;
import corinee.cokkiri.db.repository.UserRepository;
import corinee.cokkiri.api.request.CreateRoomRequest;
import corinee.cokkiri.api.request.EnterRoomRequest;
import corinee.cokkiri.api.request.ExitRoomRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final StudyTimeRepository studyTimeRepository;

    public Room findById(Long id) {
        Room room = roomRepository.findById(id);
        return room;
    }

    public Long addRoom(CreateRoomRequest request) {
        User findUser = userRepository.findByEmail(request.getEmail());

        if (findUser == null)
            return null;

        if (duplicatedTitle(request.getTitle()))
            return -1L;

        Room room = new Room(findUser, request.getTitle(), request.getUserLimit());
        room.setUserCount(0L);
        Long roomId = roomRepository.add(room);
        return roomId;
    }

    public boolean duplicatedTitle(String title) {
        List<Room> roomList = roomRepository.findListByTitle(title);
        return roomList.size() > 0;
    }

    public List<Room> findListByKeyword(int offset, int limit, String keyword) {
        return roomRepository.findListByKeyword(offset, limit, keyword);
    }

    public Long enterRoom(EnterRoomRequest request) {
        StudyTime studyTime = new StudyTime();
        User findUser = userRepository.findByEmail(request.getEmail());
        if (findUser == null)
            return -1L;
        else
            studyTime.setUser(findUser);

        Room room = roomRepository.findById(request.getRoomId());
        if (room == null) {
            return -2L;
        }
        if (room.getUserCount() >= room.getUserLimit()) {
            return -3L;
        }

        studyTime.setStartDatetime(LocalDateTime.now());
        Long id = studyTimeRepository.add(studyTime);
        room.setUserCount(room.getUserCount()+1);

        return id;

    }

    public boolean exitRoom(ExitRoomRequest request) {
        StudyTime findStudyTime = studyTimeRepository.findById(request.getId());
        if (findStudyTime != null) {
            findStudyTime.setEndDatetime(LocalDateTime.now());
        }
        else {
            return false;
        }

        Room room = roomRepository.findById(request.getRoomId());

        if(room == null) {
            return false;
        }

        room.setUserCount(room.getUserCount()-1);

        return true;
    }
}

