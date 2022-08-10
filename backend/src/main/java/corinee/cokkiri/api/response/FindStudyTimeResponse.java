package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FindStudyTimeResponse extends BaseResponse {

    private Long totalTime;

    public static FindStudyTimeResponse of (int statusCode, String message, Long time) {
        FindStudyTimeResponse response = new FindStudyTimeResponse();

        response.setStatusCode(statusCode);
        response.setMessage(message);
        response.setTotalTime(time);

        return response;
    }
}
