CREATE DATABASE  IF NOT EXISTS `visitedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `visitedb`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: visitedb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit` (
  `visit_code` bigint NOT NULL,
  `date` date DEFAULT NULL,
  `departure_date` time(6) DEFAULT NULL,
  `purpose` varchar(100) NOT NULL,
  `visitor_id` bigint DEFAULT NULL,
  `departure_time` time(6) DEFAULT NULL,
  PRIMARY KEY (`visit_code`),
  KEY `FKb217j6rjijr1p3kde3hw2gm8x` (`visitor_id`),
  CONSTRAINT `FKb217j6rjijr1p3kde3hw2gm8x` FOREIGN KEY (`visitor_id`) REFERENCES `visitor` (`visitor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES (352,'2023-12-20','12:00:00.000000','Entretien Embauche',153,NULL),(353,'2023-12-19','15:30:00.000000','Contrat Maché',152,NULL),(354,'2023-12-26','10:50:00.000000','Negociation Affaire',154,NULL),(355,'2023-12-21','09:50:00.000000','Reunion Reforme',160,NULL),(356,'2023-12-30','17:30:00.000000','Reforme Contrat',157,NULL),(357,'2023-12-24','08:55:00.000000','Actite Geo',161,NULL),(358,'2023-12-22','17:00:00.000000','Choix Strategique',152,NULL),(359,'2023-12-25','10:50:00.000000','Lancement SD',163,NULL),(360,'2023-12-23','15:35:00.000000','Prestation Serv',162,NULL),(361,'2023-12-27','18:50:00.000000','Analyse Part',155,NULL),(362,'2023-12-24','14:00:00.000000','Bilan Annuel',152,NULL),(363,'2023-12-31','08:00:00.000000','Meeting corp.',158,NULL),(364,'2023-12-27','17:00:00.000000','Stat Vente',156,NULL),(365,'2023-12-25','11:00:00.000000','Demarche PRJ',155,NULL),(366,'2023-12-28','20:00:00.000000','Nouveau Projet',154,NULL),(367,'2023-12-22','15:10:00.000000','Ajustement fin*',153,NULL);
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit_seq`
--

DROP TABLE IF EXISTS `visit_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_seq`
--

LOCK TABLES `visit_seq` WRITE;
/*!40000 ALTER TABLE `visit_seq` DISABLE KEYS */;
INSERT INTO `visit_seq` VALUES (451);
/*!40000 ALTER TABLE `visit_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor` (
  `visitor_id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  PRIMARY KEY (`visitor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
INSERT INTO `visitor` VALUES (152,'Ngousso','temgouaromeo@icloud.com','Romeo',NULL,'Temgoua','6 93 90 54 73'),(153,'foreke','temgouaromeo@gmail.com','Wilson',NULL,'JD','682629274'),(154,'Emana','davidosd24@gmail.com','David',NULL,'OSD','677931759'),(155,'redline','franckdilane@gmail.com','Dilane',NULL,'Franck','695509454'),(156,'foto','jefharold02@gmail.com','Djef',NULL,'Harold','670153317'),(157,'Emana pont','desthdongo@gmail.com','Desth',NULL,'Dongo','659587544'),(158,'cite verte','alanstyve@gmail.com','Styve',NULL,'Alan','694341659'),(159,'mokolo','ken02robinson@gmail.com','Robinson',NULL,'Ken','695587412'),(160,'tsinga','simoalf258@gmail.com','Alfred',NULL,'Simo','658541224'),(161,'douala-pk14','willyalan@gmail.com','Willy',NULL,'Alan','682569584'),(162,'bonaberi','styveleo441@gmail.com','Leonel',NULL,'Styve','655421542'),(163,'bafoussam li','cedricjohn@gmail.com','John',NULL,'Cedric','674489654');
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_seq`
--

DROP TABLE IF EXISTS `visitor_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_seq`
--

LOCK TABLES `visitor_seq` WRITE;
/*!40000 ALTER TABLE `visitor_seq` DISABLE KEYS */;
INSERT INTO `visitor_seq` VALUES (251);
/*!40000 ALTER TABLE `visitor_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20 12:41:27
