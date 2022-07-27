package corinee.cokkiri.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Getter @Setter
public class User {

    @Id
    private String email;
    private String password;
    private String nickname;
    private String refreshToken;
    private boolean authState;

    public User(){

    }

}
