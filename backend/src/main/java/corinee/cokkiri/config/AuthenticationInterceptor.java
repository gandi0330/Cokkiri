package corinee.cokkiri.config;

import corinee.cokkiri.service.UserService;
import corinee.cokkiri.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@Component
public class AuthenticationInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        try{

            String token = request.getHeader("jwt");
            System.out.println(token);
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

}
