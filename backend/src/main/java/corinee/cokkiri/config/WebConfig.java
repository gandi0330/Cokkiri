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
                .addPathPatterns("/user/*")
                .excludePathPatterns("/user/new")
                .excludePathPatterns("/user/email")
                .excludePathPatterns("/user/email/*/*")
                .addPathPatterns("/user/info/*")
                .addPathPatterns("/user/secession/*")
                .addPathPatterns("/answer")
                .addPathPatterns("/answer/**")
                .addPathPatterns("/question")
                .addPathPatterns("/question/**");
    }
}
