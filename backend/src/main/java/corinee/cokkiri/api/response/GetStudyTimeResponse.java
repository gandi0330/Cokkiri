package corinee.cokkiri.api.response;

import corinee.cokkiri.common.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class GetStudyTimeResponse extends BaseResponse {

    private Long totalTime;

    public static GetStudyTimeResponse of (int statusCode, String message, Long time) {
        GetStudyTimeResponse res = new GetStudyTimeResponse();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTotalTime(time);

        return res;
    }
}
