package corinee.cokkiri.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.cj.xdevapi.JsonParser;
import corinee.cokkiri.domain.Openvidu;
import corinee.cokkiri.domain.Room;
import corinee.cokkiri.domain.StudyTime;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.repository.RoomRepository;
import corinee.cokkiri.repository.StudyTimeRepository;
import corinee.cokkiri.repository.UserRepository;
import corinee.cokkiri.request.CreateRoomRequest;
import corinee.cokkiri.request.EnterRoomRequest;
import corinee.cokkiri.request.ExitRoomRequest;
import corinee.cokkiri.request.SearchRoomRequest;
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

    public Openvidu enterRoom(EnterRoomRequest request) {
        StudyTime studyTime = new StudyTime();
        Optional<User> optUser = userRepository.findByEmail(request.getEmail());
        if (optUser.isPresent())
            studyTime.setUser(optUser.get());
        else
            return null;
        Room room = roomRepository.findById(request.getRoomId());
        if (room == null) {
            return null;
        }
        if (room.getUserCount() >= room.getUserLimit()) {
            return null;
        }


        studyTime.setStartDatetime(LocalDateTime.now());
        Long index = studyTimeRepository.save(studyTime);

        if(room.getUserCount() < 1){
            room.setUserCount(room.getUserCount()+1);
            createSession(room.getRoomId());
        }

        Openvidu openvidu = createConnection(room.getRoomId());
        openvidu.setIndex(index);

        openvidu.setNickname(room.getUser().getNickname());

        return openvidu;


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

        room.setUserCount(room.getUserCount() - 1);
        closeConnection(request);
        if( room.getUserCount() < 1 ) {
            closeSession(request);
        }
        return true;
    }


    public String createSession(Long roomId) {
        System.out.println("@@@@@@createSession!!" + roomId);
        String url = "http://i7c107.p.ssafy.io:5443/openvidu/api/sessions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth("OPENVIDUAPP", "COKKIRI");
        httpHeaders.add("Content-Type", "application/json");

        Session sess = new Session();
        sess.setCustomSessionId(roomId+"");

        HttpEntity<?> requestEntity = new HttpEntity<>(sess, httpHeaders);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = new HashMap<>();
        System.out.println("!!!!!"+responseBody);
        try {
            map = objectMapper.readValue(responseBody, Map.class);

        }
        catch (IOException e){
            e.printStackTrace();
        }

        if(map != null){
            return map.get("id");
        }

        return null;
    }

    @Data
    static class Connection{
        private String type;
    }

    @Data
    static class Session{
        private String customSessionId;
    }

    public Openvidu createConnection(Long roomId){
        System.out.println("@@@@conection : " + roomId);
        String url = "http://i7c107.p.ssafy.io:5443/openvidu/api/sessions/"+roomId+"/connection";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth("OPENVIDUAPP", "COKKIRI");
        httpHeaders.add("Content-Type", "application/json");


        Connection conn = new Connection();
        conn.setType("WEBRTC");

        HttpEntity<?> requestEntity = new HttpEntity<>(conn,httpHeaders);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = new HashMap<>();
        try {
            map = objectMapper.readValue(responseBody, Map.class);
        }
        catch (IOException e){
            e.printStackTrace();
        }

        if(map != null){
            Openvidu openvidu = new Openvidu();
            openvidu.setConnectionId(map.get("id"));
            openvidu.setToken(map.get("token"));

            return openvidu;
        }

        return null;

    }



    public void closeConnection(ExitRoomRequest request) {
        String url = "http://i7c107.p.ssafy.io:5443/openvidu/api/sessions/" + request.getRoomId() + "/connection/" + request.getConnectionId();

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth("OPENVIDUAPP", "COKKIRI");
        httpHeaders.add("Content-Type", "application/json");

        HttpEntity<?> requestEntity = new HttpEntity<>(httpHeaders);
        System.out.println("requestEntity = " + requestEntity);

        HttpEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);
        HttpHeaders responseHeaders = response.getHeaders();
        String responseBody = response.getBody();
        System.out.println("responseHeaders = " + responseHeaders);
        System.out.println("responseBody = " + responseBody);
    }

    public void closeSession(ExitRoomRequest request) {
        String url = "http://i7c107.p.ssafy.io:5443/openvidu/api/sessions/" + request.getRoomId();

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth("OPENVIDUAPP", "COKKIRI");
        httpHeaders.add("Content-Type", "application/json");

        HttpEntity<?> requestEntity = new HttpEntity<>(httpHeaders);
        System.out.println("requestEntity = " + requestEntity);

        HttpEntity<String> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);
        HttpHeaders responseHeaders = response.getHeaders();
        String responseBody = response.getBody();
        System.out.println("responseHeaders = " + responseHeaders);
        System.out.println("responseBody = " + responseBody);
    }
}

