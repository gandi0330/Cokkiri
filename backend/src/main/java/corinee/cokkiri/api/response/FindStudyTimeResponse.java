package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FindStudyTimeResponse extends BaseResponse {

    private Long totalTime;

    public static FindStudyTimeResponse of (int statusCode, String message, Long time) {
        FindStudyTimeResponse res = new FindStudyTimeResponse();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTotalTime(time);

        return res;
    }
}
