package corinee.cokkiri.repository;

import corinee.cokkiri.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
