package corinee.cokkiri.service;

import corinee.cokkiri.domain.Room;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.repository.RoomRepository;
import corinee.cokkiri.repository.UserRepository;
import corinee.cokkiri.request.CreateRoomRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

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
        Long id = roomRepository.createRoom(room);
        return id;
    }

    public boolean duplicatedTitle(String title) {
        List<Room> result = roomRepository.findByTitle(title);
        return result.size() > 0;
    }
}
