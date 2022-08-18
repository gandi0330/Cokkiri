-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: i7c107.p.ssafy.io    Database: cokkiri
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` bigint NOT NULL,
  `code` varchar(3000) DEFAULT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `create_datetime` datetime(6) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `room_id` bigint DEFAULT NULL,
  `question_writer_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `FK8uj5u1ki48awftnyabhfgpke` (`room_id`),
  KEY `FKnferqfjxjre08pr2bp1qsm3iv` (`question_writer_email`),
  CONSTRAINT `FK8uj5u1ki48awftnyabhfgpke` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE,
  CONSTRAINT `FKnferqfjxjre08pr2bp1qsm3iv` FOREIGN KEY (`question_writer_email`) REFERENCES `user` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (91,'','들어도 잘 이해가 안 되는데 잘 아시는 분 있나요?','2022-08-16 12:13:30.595937','java','실행 컨텍스트가 정확히 뭐예요?',83,'suaveh3681@gmail.com'),(92,'','아니 이거 정말 어떻게 받아와요?\n알고리즘 문제 풀려고 하는데 prompt?인가 그거 쓰면 되는 거예요?','2022-08-16 16:14:41.633652','java','자바스크립트 input 어떻게 받아와요?',83,'suaveh3681@gmail.com'),(93,'','async\nawait\n도대체 어떻게 써야되는지 모르겠어요 ㅠㅠ','2022-08-17 14:14:55.140625','java','비동기 처리.... 정확히 이해가 안가요',83,'wow2867@naver.com'),(96,'','와이..','2022-08-17 20:18:33.600985','java','왜 객체 안 에서는 정규 함수를 쓰면 안되는가..?',83,'suaveh3681@gmail.com'),(102,'','이게 왜 있는지 모르겠어요....','2022-08-18 16:21:15.633189','java','하.... 또 호이스팅은 뭔가요 ㅠㅠ',83,'wow2867@naver.com'),(105,'console.log(1==\'1\');','이거 왜 true로 나올까요?? ㅠㅠ','2022-08-18 16:27:04.607695','javascript','자스 문법 질문이요!!',83,'gandi0330@naver.com');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 16:32:50
