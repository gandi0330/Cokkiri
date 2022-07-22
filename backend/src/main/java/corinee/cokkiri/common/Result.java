package corinee.cokkiri.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Result {
    private int statusCode;
    private String message;

    public static Result of(int statusCode, String message){
        Result result = new Result();
        result.setStatusCode(statusCode);
        result.setMessage(message);
        return result;
    }
}