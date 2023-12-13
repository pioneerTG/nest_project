-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: nest
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `Board`
--

DROP TABLE IF EXISTS `Board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f7e8317a3d5a56a672dc7010133` (`userId`),
  CONSTRAINT `FK_f7e8317a3d5a56a672dc7010133` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Board`
--

LOCK TABLES `Board` WRITE;
/*!40000 ALTER TABLE `Board` DISABLE KEYS */;
INSERT INTO `Board` VALUES (5,'김찬울','테스트','/uploads/2b1b2526e203582eab43c597f4fca31f.png','2023-12-12 23:19:17.844828','2023-12-13 13:14:35.000000',NULL),(15,'김찬울','태스트','/uploads/10aca8e41d75e7d1a85b3862ddc1f6422.png','2023-12-13 13:45:56.844365','2023-12-13 13:46:03.000000',NULL),(16,'신','나는야','/uploads/2538428aa01108ebddd5ae45c9ad5eb69.png','2023-12-13 13:54:37.158525','2023-12-13 13:54:37.158525',NULL);
/*!40000 ALTER TABLE `Board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `boardId` int NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4c827119c9554affb8018d4da82` (`userId`),
  KEY `FK_ba0484e74415fd19b44a59ae428` (`boardId`),
  CONSTRAINT `FK_4c827119c9554affb8018d4da82` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `FK_ba0484e74415fd19b44a59ae428` FOREIGN KEY (`boardId`) REFERENCES `Board` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
INSERT INTO `Comment` VALUES (12,'김찬울',5,'아하하하','2023-12-13 12:32:59.076667','2023-12-13 13:46:11.000000',NULL),(14,'김찬울',5,'나는야','2023-12-13 12:40:25.713118','2023-12-13 13:46:14.000000',NULL),(25,'김찬울',5,'뭐하지','2023-12-13 13:46:21.362735','2023-12-13 13:46:21.362735',NULL),(26,'김찬울',15,'태 -> 테','2023-12-13 13:46:32.529112','2023-12-13 13:46:32.529112',NULL),(27,'신',5,'아하하','2023-12-13 13:48:35.877029','2023-12-13 13:48:35.877029',NULL),(28,'신',5,'뭐야','2023-12-13 13:48:39.491566','2023-12-13 13:48:39.491566',NULL),(29,'신',15,'음','2023-12-13 13:54:25.923885','2023-12-13 13:54:25.923885',NULL);
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'김찬울','kimcw0218@g.yju.ac.kr','$2b$10$i01bYsqGqIKRDzv61SMMmuQIZ2mbky4s5sT3KmWBnTAK9UN6mdugK','2023-12-12 16:02:01.525017','2023-12-12 16:02:01.525017'),(2,'김정민','k@n.c','$2b$10$DEn9g11K3ILe06i.g.GcEOGDyLO2KqEin9zr1SITWoD4C5TndP266','2023-12-12 23:19:45.462971','2023-12-12 23:19:45.462971'),(3,'신','god@god.god','$2b$10$1yPws/nqqxlWKH.4M/Q0ZuP1TV8lreGguGpXtwjYVjoCvga/o0ByK','2023-12-13 13:47:12.177077','2023-12-13 13:47:12.177077'),(4,'박영진','jit_wd@gmail.com','$2b$10$qIhGavBRglxpvzjisBw0DOcj1ZRFVhCfaFGpz9vpMDC2RldshcXLq','2023-12-13 15:36:39.228859','2023-12-13 15:36:39.228859');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-13 15:38:07
