-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `otp_id` int NOT NULL AUTO_INCREMENT,
  `otp` char(6) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `time_start` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`otp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES (1,'421989','zzeedassz@gmail.com','zzeedasszgmailcom','2024-03-04 13:29:54.799000'),(2,'940367','zzeedassz@gmail.com','sssssssssss','2024-03-04 13:38:33.798000'),(3,'712046','zzeedassz@gmail.com','sssssssssss','2024-03-04 13:41:09.027000'),(4,'195841','joezakub1121@hotmail.com','aaaaaaaaaaaaaaaaaaaa','2024-03-07 12:57:13.182000'),(5,'817595','joezakub1121@hotmail.com','aaaaaaaaaaaaaaaaaaaa','2024-03-07 12:57:59.327000');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_item`
--

DROP TABLE IF EXISTS `todo_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_item` (
  `todo_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(15) DEFAULT NULL,
  `details` varchar(500) DEFAULT NULL,
  `date_start` timestamp(6) NULL DEFAULT NULL,
  `date_end` timestamp(6) NULL DEFAULT NULL,
  `user_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`todo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_item`
--

LOCK TABLES `todo_item` WRITE;
/*!40000 ALTER TABLE `todo_item` DISABLE KEYS */;
INSERT INTO `todo_item` VALUES (1,'ggg','','2024-03-21 13:37:00.000000',NULL,'2'),(2,'f','ghg','2024-03-04 13:28:00.000000','2024-03-11 13:28:00.000000','2'),(3,'df','',NULL,NULL,'2'),(5,'sd','','2024-03-04 13:42:00.000000','2024-03-11 13:42:00.000000','3'),(6,'hjhj','ss',NULL,NULL,'4');
/*!40000 ALTER TABLE `todo_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `user_password` char(255) DEFAULT NULL,
  `user_verification` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'zzeedassz@gmail.com','sssssssssss','$argon2id$v=19$m=65536,t=3,p=4$j7RFxwomdn/E8i8rknSHwg$yobvcs0LnolDiVHcmVmlwQJV1pAakKU+UJpu96UL2X8',1),(3,'sarankunsutha@gmail.com','S1kU1WUQ02L7DU5Ul2Gh',NULL,1),(5,'a@a.com','undefined','$argon2id$v=19$m=65536,t=3,p=4$ybmo5n2ApIz1aJmNfg99hw$DTzClOdnWHHlipnE5bIjmVQWiPAk7eh3jrM0AqVEM5o',0),(13,'a@b.com','qqqqqqqqqqqqqqqqqqqq','$argon2id$v=19$m=65536,t=3,p=4$7P/9Fugg2buOhSjjlHKW8Q$nBYHfDMBMHTdy/P202U9tDIXXm8vZyYBrzr0NaocRy4',1),(14,'joezakub1121@hotmail.com','aaaaaaaaaaaaaaaaaaaa','$argon2id$v=19$m=65536,t=3,p=4$EWR2AiAyDIy/DFVJ+t3IfA$mwdCMXMlrfq+xmMTVODrI5QgK8zJrmhXZg2vdrCQAvg',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-08  2:16:08
