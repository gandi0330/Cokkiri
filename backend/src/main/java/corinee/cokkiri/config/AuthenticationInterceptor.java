package corinee.cokkiri.config;

import corinee.cokkiri.api.service.UserService;
import corinee.cokkiri.common.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {


        if(isPreflightRequest(request)){
            return true;
        }

        if(HttpMethod.OPTIONS.matches(request.getMethod())) {
            response.setHeader("Access-Control-Allow-Origin","localhost:3000, i7c107.p.ssafy.io, https://i7c107.p.ssafy.io");
            return true;
        }

        try{

            String token = request.getHeader("jwt");
            if(token == null){
                response.setStatus(404);
                return false;
            }
            else if(!jwtTokenUtil.verifyToken(token)){
                response.setStatus(401);
                return false;
            };
            response.setStatus(200);
            return true;

        }catch(Exception e){
            System.out.println(e.getMessage());
            response.setStatus(500);
        }

        return true;

    }


    private boolean isPreflightRequest(HttpServletRequest request) {
        return isOptions(request) && hasHeaders(request) && hasMethod(request) && hasOrigin(request);
    }

    private boolean isOptions(HttpServletRequest request) {
        return request.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.toString());
    }

    private boolean hasHeaders(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Access-Control-Request-Headers"));
    }

    private boolean hasMethod(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Access-Control-Request-Method"));
    }

    private boolean hasOrigin(HttpServletRequest request) {
        return Objects.nonNull(request.getHeader("Origin"));
    }

}
