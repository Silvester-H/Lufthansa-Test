CREATE DATABASE  IF NOT EXISTS `annualleave` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `annualleave`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: annualleave
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-02-01 19:13:46','admin001','$2a$10$KDMMYUIhIzmjWZrmpUkFz.FlmzANUPcGCPa7QGqpxkvlSXqcN8L1a','2018-11-23 00:00:00','Admin','admin001'),(3,'2022-02-01 18:38:17','admin001','$2a$10$lU5E1Fq.g1z/dg5SMmOIxOa3RmUJAg3wrMXNGvn6G.KAyUT9ScPia','2022-02-01 19:38:17','Admin','admin003'),(9,'2022-02-02 11:42:26','admin001','$2a$10$aEb2kDdKqQ8Yk7ZDDgASOOgm93kporFtqKJ3xGYOIwfDP3r3UXLOG','2020-01-02 01:00:00','Admin','admin10'),(6,'2022-02-02 09:21:00','test','$2a$10$0n2KWsLz9w7hBg8Z8kH5ReKxrdxCBbWn6fN8ACtR.M98xY4ec3dnq','2022-02-01 20:08:33','Supervisor','test'),(7,'2022-02-02 11:41:53','admin001','$2a$10$jhpuRrOVErOkGkc8PvU8QeCp8QKPcBeSv6NlSaQT1tCVz9oms3PO2','2021-11-10 01:00:00','User','testa'),(10,'2022-02-02 11:42:51','admin001','$2a$10$VEP0DHkfKLQsDxCFqYSzluGoRt83Wq2ctsC2L/6YzGnbvX1yvXo8e','2022-02-02 12:42:52','Supervisor','super10');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-02 15:47:57
