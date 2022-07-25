package corinee.cokkiri.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import corinee.cokkiri.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {



    @Override
    public void addInterceptors(InterceptorRegistry reg) {
        reg.addInterceptor(new AuthenticationInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/user")
                .excludePathPatterns("/user/nickname/**")
                .excludePathPatterns("/user/new");
    }
}
