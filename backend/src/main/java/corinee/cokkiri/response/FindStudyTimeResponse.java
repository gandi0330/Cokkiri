package corinee.cokkiri.response;

import corinee.cokkiri.common.Result;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FindStudyTimeResponse extends Result {

    private Long totalTime;

    public static FindStudyTimeResponse of (int statusCode, String message, Long time) {
        FindStudyTimeResponse response = new FindStudyTimeResponse();

        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setTotalTime(time);

        return response;
    }
}
