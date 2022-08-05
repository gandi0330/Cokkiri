package corinee.cokkiri.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String hello(){

        String url = "http://i7c107.p.ssafy.io:5443/openvidu/api/sessions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth("OPENVIDUAPP", "COKKIRI");


        HttpEntity<?> requestEntity = new HttpEntity<>(httpHeaders);
        System.out.println("requestEntity = " + requestEntity);

        HttpEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        HttpHeaders responseHeaders = response.getHeaders();
        String responseBody = response.getBody();
        System.out.println("responseHeaders = " + responseHeaders);
        System.out.println("responseBody = " + responseBody);

        return responseBody;
    }

}