package corinee.cokkiri;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value = { "classpath:db.properties" })
public class CokkiriApplication extends SpringBootServletInitializer {
	// 현명 테스트 완료
	// 동완 테스트 완료
	// 석호 테스트 완료

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application){
		return application.sources(CokkiriApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(CokkiriApplication.class, args);
	}

}
