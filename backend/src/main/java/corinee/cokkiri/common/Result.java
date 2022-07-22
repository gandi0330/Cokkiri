package corinee.cokkiri.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result<T> {
    private int statusCode;
    private T data;
}