package corinee.cokkiri.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
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
                .excludePathPatterns("/user/refreshtoken/**")
                .addPathPatterns("/user/info/*")
                .addPathPatterns("/user/secession/*")
                .addPathPatterns("/answer")
                .addPathPatterns("/answer/**")
                .addPathPatterns("/question")
                .addPathPatterns("/question/**")
                .addPathPatterns("/room/**")
                .excludePathPatterns("/room/list/**")
                .addPathPatterns("/studytime/*");
    }


    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("localhost:3000","i7c107.p.ssafy.io","https://i7c107.p.ssafy.io")
                .allowedMethods("*")
                .allowedHeaders("Access-Control-Allow-Headers", "Origin", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Methods", "Access-Control-Request-Headers", "jwt", "access-control-allow-origin")
                .allowCredentials(true);
    }
}
