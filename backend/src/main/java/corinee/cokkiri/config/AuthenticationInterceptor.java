package corinee.cokkiri.config;

import corinee.cokkiri.service.UserService;
import corinee.cokkiri.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
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

        if(HttpMethod.OPTIONS.matches(request.getMethod())) {
            response.setHeader("Access-Control_Allow_Origin","localhost:3000");
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

}
