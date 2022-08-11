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
        Optional<User> optUser = userRepository.findByEmail(request.getEmail());
        User user = null;

        if (optUser.isPresent())
            user = optUser.get();
        else
            return null;

        if (duplicatedTitle(request.getTitle()))
            return -1L;

        Room room = new Room(user, request.getTitle(), request.getUserLimit());
        room.setUserCount(0L);
        Long roomId = roomRepository.add(room);
        return roomId;
    }

    public boolean duplicatedTitle(String title) {
        List<Room> result = roomRepository.findByTitle(title);
        return result.size() > 0;
    }

    public List<Room> findListByKeyword(int offset, int limit, String keyword) {
        return roomRepository.findListByKeyword(offset, limit, keyword);
    }

    public Long enterRoom(EnterRoomRequest request) {
        StudyTime studyTime = new StudyTime();
        Optional<User> optUser = userRepository.findByEmail(request.getEmail());
        if (optUser.isPresent())
            studyTime.setUser(optUser.get());
        else
            return -1L;
        Room room = roomRepository.findById(request.getRoomId());
        if (room == null) {
            return -2L;
        }
        if (room.getUserCount() >= room.getUserLimit()) {
            return -3L;
        }


        studyTime.setStartDatetime(LocalDateTime.now());
        Long id = studyTimeRepository.add(studyTime);

        return id;

    }

    public boolean exitRoom(ExitRoomRequest request) {
        Optional<StudyTime> optStudyTime = studyTimeRepository.findById(request.getIndex());
        if (optStudyTime.isPresent()) {
            StudyTime studyTime = optStudyTime.get();
            studyTime.setEndDatetime(LocalDateTime.now());
        } else {
            return false;
        }

        Room room = roomRepository.findById(request.getRoomId());

        if(room == null) {
            return false;
        }

        return true;
    }

}

