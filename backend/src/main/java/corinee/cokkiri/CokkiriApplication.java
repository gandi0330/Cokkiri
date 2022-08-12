package corinee.cokkiri;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
@PropertySource(value = { "classpath:db.properties" })
public class CokkiriApplication extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application){
		return application.sources(CokkiriApplication.class);
	}

	@PostConstruct
	public void setTimezone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		System.out.println("현재 시각 : " + new Date());
	}

	public static void main(String[] args) {
		SpringApplication.run(CokkiriApplication.class, args);
	}

}
