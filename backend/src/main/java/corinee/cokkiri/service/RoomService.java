package corinee.cokkiri.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import corinee.cokkiri.domain.Room;
import corinee.cokkiri.domain.StudyTime;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.repository.RoomRepository;
import corinee.cokkiri.repository.StudyTimeRepository;
import corinee.cokkiri.repository.UserRepository;
import corinee.cokkiri.request.CreateRoomRequest;
import corinee.cokkiri.request.EnterRoomRequest;
import corinee.cokkiri.request.ExitRoomRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
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

    public Long createRoom(CreateRoomRequest request) {
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
        Long id = roomRepository.createRoom(room);
        return id;
    }

    public boolean duplicatedTitle(String title) {
        List<Room> result = roomRepository.findByTitle(title);
        return result.size() > 0;
    }

    public List<Room> findRoomList(int offset, int limit, String keyword) {
        return roomRepository.findRoomList(offset, limit, keyword);
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
        Long index = studyTimeRepository.save(studyTime);

        return index;

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

