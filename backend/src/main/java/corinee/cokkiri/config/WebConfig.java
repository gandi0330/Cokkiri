package corinee.cokkiri.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import corinee.cokkiri.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    AuthenticationInterceptor authenticationInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry reg) {
        reg.addInterceptor(authenticationInterceptor)
                .addPathPatterns("/**");
    }
}
