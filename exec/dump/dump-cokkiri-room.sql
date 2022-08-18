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
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` bigint NOT NULL,
  `create_datetime` datetime(6) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_count` bigint DEFAULT NULL,
  `user_limit` bigint DEFAULT NULL,
  `leader_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `FK1ycthryen1qbmdnyfb4c34l8l` (`leader_email`),
  CONSTRAINT `FK1ycthryen1qbmdnyfb4c34l8l` FOREIGN KEY (`leader_email`) REFERENCES `user` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'2022-08-18 16:02:29.278356',NULL,'JPA 스터디',0,6,'gandi0330@naver.com'),(4,'2022-08-18 16:03:04.642751',NULL,'타입스크립트로 알고리즘 풀기',0,4,'suaveh3681@gmail.com'),(7,'2022-08-18 16:03:25.046694',NULL,'자바스크립트부터 잘하자',0,6,'suaveh3681@gmail.com'),(10,'2022-08-18 16:03:28.046318',NULL,'광주 1반 알고리즘 스터디',0,8,'wow2867@naver.com'),(13,'2022-08-18 16:03:40.894694',NULL,'미라클 알고리즘',0,15,'suaveh3681@gmail.com'),(18,'2022-08-18 16:04:05.490486',NULL,'광주 2반 알고리즘 스터디',0,12,'wjd10577@naver.com'),(21,'2022-08-18 16:04:13.200383',NULL,'SSAFY 9기 준비방',0,8,'gandi0330@naver.com'),(24,'2022-08-18 16:04:23.112935',NULL,'파이썬 기초반',0,15,'suaveh3681@gmail.com'),(30,'2022-08-18 16:04:51.411969',NULL,'삼성 A형 대비',0,15,'suaveh3681@gmail.com'),(33,'2022-08-18 16:05:18.026554',NULL,'Linux Master 준비',0,12,'wow2867@naver.com'),(36,'2022-08-18 16:05:45.770590',NULL,'💎프론트엔드의 모든 것💎',0,15,'suaveh3681@gmail.com'),(40,'2022-08-18 16:06:34.507408',NULL,'아두이노 교육 키트 개발',0,4,'wow2867@naver.com'),(43,'2022-08-18 16:06:53.547626',NULL,'Java Spring🌺',0,12,'suaveh3681@gmail.com'),(47,'2022-08-18 16:07:39.926969',NULL,'1일1알고',0,4,'suaveh3681@gmail.com'),(50,'2022-08-18 16:07:47.476929',NULL,'django의 모든 것',0,6,'wjd10577@naver.com'),(53,'2022-08-18 16:07:50.342531',NULL,'Cokkiri 팀 스터디룸',0,6,'gandi0330@naver.com'),(56,'2022-08-18 16:08:13.333975',NULL,'C++ A to Z',0,15,'wow2867@naver.com'),(59,'2022-08-18 16:08:19.689529',NULL,'광주 현성고 3반',0,15,'suaveh3681@gmail.com'),(62,'2022-08-18 16:08:26.594717',NULL,'vue 3.0 공부방',0,8,'wjd10577@naver.com'),(65,'2022-08-18 16:08:51.073035',NULL,'python eng only',0,6,'suaveh3681@gmail.com'),(68,'2022-08-18 16:09:24.184240',NULL,'유튜브 클론 코딩',0,4,'wjd10577@naver.com'),(71,'2022-08-18 16:09:39.259853',NULL,'자바 토이 프로젝트',0,8,'suaveh3681@gmail.com'),(74,'2022-08-18 16:09:59.407242',NULL,'블록체인 스터디',0,8,'wow2867@naver.com'),(77,'2022-08-18 16:10:09.143294',NULL,'TDD 배워요',0,4,'suaveh3681@gmail.com'),(80,'2022-08-18 16:11:14.140872',NULL,'C++ 뿐이야',0,6,'suaveh3681@gmail.com'),(83,'2022-08-18 16:12:36.961852',NULL,'자바스크립트 스터디',0,8,'suaveh3681@gmail.com');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 16:36:46
