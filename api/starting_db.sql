-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: music
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.20.04.1

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
-- Current Database: `music`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `musicbank` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `musicbank`;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_small` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `release_date` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL,
  `popularity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_39986E43B7970CF8` (`artist_id`),
  CONSTRAINT `FK_39986E43B7970CF8` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (6,1,'Night Visions','Night Visions is the debut studio album by American pop rock band Imagine Dragons. It was released on September 4, 2012, through Kidinakorner and Interscope Records. The extended version was released on February 12, 2013, adding three more songs and the UK release of the album was on March 26, 2013. Recorded between 2010 and 2012, the album was primarily produced by the band themselves, as well as English hip-hop producer Alex da Kid and Brandon Darner from the American indie rock group The Envy Corps. It was mastered by Joe LaPorta. According to frontman Dan Reynolds, the album took three years to finish, with six of the album\'s tracks being previously released on multiple EPs. Musically, Night Visions exhibits influences of folk, hip hop and pop.','https://i.pinimg.com/originals/82/06/b2/8206b21e0b7207927fb70dc070c9fdc4.jpg','https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Night_Visions_Album_Cover.jpeg/220px-Night_Visions_Album_Cover.jpeg','2012-09-04',NULL),(7,1,'Origins','Origins is the fourth studio album by the American pop rock band Imagine Dragons, released on November 9, 2018 by Kidinakorner, Polydor Records and Interscope Records.\n\n        The album was produced by the band members themselves, frequent collaborator Alex da Kid, Mattman & Robin, John Hill, Joel Little, Tim Randolph, and Jayson DeZuzio, who produced a majority of the band\'s previous effort, Evolve (2017), as well as Jorgen Odegard. Frontman Dan Reynolds described Origins as a \'sister album\' to Evolve, and that it would complete a cycle of their music.','https://images-na.ssl-images-amazon.com/images/I/81TwY1AcKBL._SL1400_.jpg','https://upload.wikimedia.org/wikipedia/en/9/95/Origins_cover.png','2018-10-09',NULL),(8,1,'Evolve','Evolve (stylized as ƎVOLVE) is the third studio album by American pop rock band Imagine Dragons, released on June 23, 2017 by Kidinakorner and Interscope Records. After the release of their previous album Smoke + Mirrors (2015) and its respective world tour, a self-imposed hiatus for 2016 and cryptic messages from the band through their social media gained anticipation for their third album; it was finally announced on May 9, 2017, along with the initiation of its pre-order. In comparison to Smoke + Mirrors and their 2012 debut Night Visions, frontman Dan Reynolds called the album an \'evolution\' for the band.','https://images-na.ssl-images-amazon.com/images/I/A1QsthUoerL._SL1500_.jpg','https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg','2017-06-23',NULL),(9,1,'Smoke + Mirrors','Smoke + Mirrors is the second studio album by American pop rock band Imagine Dragons. The album was recorded during 2014 at the band\'s home studio in Las Vegas, Nevada. Self-produced by members of the band along with English hip-hop producer Alexander Grant, known by his moniker Alex da Kid, the album was released by Interscope Records and Grant\'s KIDinaKORNER label on February 17, 2015, in the United States.','https://i.pinimg.com/originals/84/9d/25/849d25966a94aa79e57ef78c16249dfc.jpg','https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Imagine_Dragons_-_Smoke_%2B_Mirrors.png/220px-Imagine_Dragons_-_Smoke_%2B_Mirrors.png','2015-02-17',NULL);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'Imagine Dragons','Imagine Dragons is an American pop rock band from Las Vegas, Nevada, consisting of lead singer Dan Reynolds, lead guitarist Wayne Sermon, bassist Ben McKee, and drummer Daniel Platzman.','The band first gained exposure with the release of their single \'It\'s Time\', followed by their award-winning debut studio album Night Visions (2012), which resulted in the chart-topping singles \'Radioactive\' and \'Demons\'. Rolling Stone named \'Radioactive\', which holds the record for most weeks charted on the Billboard Hot 100, the \'biggest rock hit of the year\'. MTV called them \'the year\'s biggest breakout band\', and Billboard named them their \'Breakthrough Band of 2013\' and \'Biggest Band of 2017\'. and placed them at the top of their \'Year In Rock\' rankings for 2013, 2017 and 2018. Imagine Dragons topped the Billboard Year-End \'Top Artists – Duo/Group\' category in 2018.','https://pbs.twimg.com/profile_images/1047708254447357957/fvJXTeOY.jpg'),(8,'Eminem','Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem (often stylized as EMINƎM), is an American rapper, songwriter, and record producer.','Credited with popularizing hip hop in Middle America, Eminem\'s global success and acclaimed works are widely regarded as having broken racial barriers for the acceptance of white rappers in popular music. While much of his transgressive work during the early 2000s made him hugely controversial, he came to be a representation of popular angst and the American underclass. He has been influential for many artists of various genres and is often cited as one of the greatest rappers of all time.','https://lecanalauditif.ca/wp-content/uploads/2018/01/Eminem-588x588.jpg');
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20200718152943','2020-07-18 17:29:54',806),('DoctrineMigrations\\Version20200718183500','2020-07-18 20:35:14',118),('DoctrineMigrations\\Version20200718212512','2020-07-18 23:25:23',90),('DoctrineMigrations\\Version20200726214324','2020-07-26 23:43:31',996),('DoctrineMigrations\\Version20200726224854','2020-07-27 00:49:04',519);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (2,'Alternative rock'),(3,'Indie rock'),(4,'Pop rock'),(5,'Electropop'),(6,'Pop'),(7,'Post-grunge'),(9,'Alternative metal'),(10,'Hard rock');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_album`
--

DROP TABLE IF EXISTS `genre_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genre_id` int NOT NULL,
  `album_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_849E71864296D31F` (`genre_id`),
  KEY `IDX_849E71861137ABCF` (`album_id`),
  CONSTRAINT `FK_849E71861137ABCF` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  CONSTRAINT `FK_849E71864296D31F` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_album`
--

LOCK TABLES `genre_album` WRITE;
/*!40000 ALTER TABLE `genre_album` DISABLE KEYS */;
INSERT INTO `genre_album` VALUES (8,4,6),(9,5,6),(10,6,7),(11,4,7),(12,4,8),(13,4,9),(14,2,9);
/*!40000 ALTER TABLE `genre_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `track`
--

DROP TABLE IF EXISTS `track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `track` (
  `id` int NOT NULL AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `track_no` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_D6E3F8A61137ABCF` (`album_id`),
  CONSTRAINT `FK_D6E3F8A61137ABCF` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `track`
--

LOCK TABLES `track` WRITE;
/*!40000 ALTER TABLE `track` DISABLE KEYS */;
INSERT INTO `track` VALUES (3,8,'Believer',3),(4,8,'I don\'t know why',1),(5,8,'Whatever it takes',2),(6,8,'Walking the Wire',4),(7,8,'Rise Up',5),(8,8,'I\'ll make it up to you',6),(9,8,'Yesterday',7),(10,8,'Mouth of the River',8),(11,8,'Thunder',9),(12,8,'Start Over',10),(13,8,'Dancing in the Dark',11),(14,7,'Natural',1),(15,7,'Boomerang',2),(16,7,'Machine',3),(17,7,'Cool Out',4),(18,7,'Bad Liar',5),(19,7,'West Coast',6),(20,7,'Zero',7),(21,7,'Bullet in a Gun',8),(22,7,'Digital',9),(23,7,'Only',10),(24,7,'Stuck',11),(25,7,'Love',12),(26,6,'Radioactive',1),(27,6,'Tiptoe',2),(28,6,'It\'s time',3),(29,6,'Demons',4),(30,6,'On Top of the World',5),(31,6,'Amsterdam',6),(32,6,'Hear Me',7),(33,6,'Every Night',8),(34,6,'Bleeding Out',9),(35,6,'Underdog',10),(36,6,'Nothing Left to Say / Rocks',11),(37,9,'Shots',1),(38,9,'Gold',2),(39,9,'Smoke and Mirrors',3),(40,9,'I\'m So Sorry',4),(41,9,'I Be My Life',5),(42,9,'Polaroid',6),(43,9,'It Comes Back to You',8),(44,9,'Dream',9),(45,9,'Trouble',10),(46,9,'Summer',11),(47,9,'Hopeless Opus',12),(48,9,'The Fall',13);
/*!40000 ALTER TABLE `track` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-29  0:58:25
