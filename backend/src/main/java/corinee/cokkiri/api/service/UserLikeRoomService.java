package corinee.cokkiri.api.service;

import corinee.cokkiri.db.domain.Room;
import corinee.cokkiri.db.domain.User;
import corinee.cokkiri.db.domain.UserLikeRoom;
import corinee.cokkiri.db.repository.UserLikeRoomRepository;
import corinee.cokkiri.api.request.UserLikeRoomRequest;
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

    public boolean duplicatedRoomId(UserLikeRoomRequest request) {
        List<UserLikeRoom> userLikeRoomList = findListByEmail(request.getEmail());

        for(UserLikeRoom userLikeRoom : userLikeRoomList) {
            if(userLikeRoom.getRoom().getRoomId() == request.getRoomId()) {
                return true;
            }
        }

        return false;
    }

    public Long addUserLikeRoom(User user, Room room) {
        UserLikeRoom userLikeRoom = new UserLikeRoom();
        userLikeRoom.setUser(user);
        userLikeRoom.setRoom(room);

        return userLikeRoomRepository.save(userLikeRoom);
    }

    public UserLikeRoom findById(Long id) {
        return userLikeRoomRepository.findById(id);
    }

    public void removeUserLikeRoom(Long id) {
        UserLikeRoom userLikeRoom = userLikeRoomRepository.findById(id);

        userLikeRoomRepository.removeUserLikeRoom(userLikeRoom);
    }
}
