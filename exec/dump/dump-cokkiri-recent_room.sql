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
-- Table structure for table `recent_room`
--

DROP TABLE IF EXISTS `recent_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recent_room` (
  `id` bigint NOT NULL,
  `visited_time` datetime(6) DEFAULT NULL,
  `room_id` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdbpxb9ji8752tssqqq1nb8re6` (`room_id`),
  KEY `FKnpgb5j54rn2s1ymweg6duvbyr` (`email`),
  CONSTRAINT `FKdbpxb9ji8752tssqqq1nb8re6` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE,
  CONSTRAINT `FKnpgb5j54rn2s1ymweg6duvbyr` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recent_room`
--

LOCK TABLES `recent_room` WRITE;
/*!40000 ALTER TABLE `recent_room` DISABLE KEYS */;
INSERT INTO `recent_room` VALUES (23,'2022-08-18 16:04:14.907287',21,'gandi0330@naver.com'),(55,'2022-08-18 16:07:52.040122',53,'gandi0330@naver.com'),(58,'2022-08-18 16:08:14.845473',56,'wow2867@naver.com'),(64,'2022-08-18 16:08:27.574798',62,'wjd10577@naver.com'),(70,'2022-08-18 16:09:25.242048',68,'wjd10577@naver.com'),(76,'2022-08-18 16:10:00.948796',74,'wow2867@naver.com'),(79,'2022-08-18 16:10:10.564812',77,'suaveh3681@gmail.com'),(82,'2022-08-18 16:11:15.638972',80,'suaveh3681@gmail.com'),(85,'2022-08-18 16:12:47.122374',83,'suaveh3681@gmail.com'),(87,'2022-08-18 16:20:11.426082',83,'wow2867@naver.com'),(89,'2022-08-18 16:13:17.137736',83,'wjd10577@naver.com'),(99,'2022-08-18 16:26:16.663931',83,'gandi0330@naver.com');
/*!40000 ALTER TABLE `recent_room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 16:32:44
