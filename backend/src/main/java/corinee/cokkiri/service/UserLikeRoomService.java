package corinee.cokkiri.service;

import corinee.cokkiri.domain.Room;
import corinee.cokkiri.domain.User;
import corinee.cokkiri.domain.UserLikeRoom;
import corinee.cokkiri.repository.UserLikeRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserLikeRoomService {

    private final UserLikeRoomRepository userLikeRoomRepository;

    public List<UserLikeRoom> findListByEmail(String email) {
        return userLikeRoomRepository.findListByEmail(email);
    }

    public Long addUserLikeRoom(User user, Room room) {
        UserLikeRoom userLikeRoom = new UserLikeRoom();
        userLikeRoom.setUser(user);
        userLikeRoom.setRoom(room);

        return userLikeRoomRepository.save(userLikeRoom);
    }

    public UserLikeRoom checkUserLikeRoom(Long userLikeRoomId) {
        return userLikeRoomRepository.getUserLikeRoom(userLikeRoomId);
    }

    public void removeUserLikeRoom(Long userLikeRoomId) {
        UserLikeRoom userLikeRoom = userLikeRoomRepository.getUserLikeRoom(userLikeRoomId);

        userLikeRoomRepository.removeUserLikeRoom(userLikeRoom);
    }
}
