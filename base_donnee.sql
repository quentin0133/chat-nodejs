-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: eurolith-admin
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

--
-- Structure de la table `acteur`
--

DROP TABLE IF EXISTS `compte`;
CREATE TABLE `compte` (
  `ID_COMPTE` int(11) NOT NULL AUTO_INCREMENT,
  `IDENTIFIANT` varchar(100) NOT NULL,
  `MOT_DE_PASSE` varchar(1000) NOT NULL,
  PRIMARY KEY (`ID_COMPTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Insertion de donnée dans la table `acteur`
--

LOCK TABLES `compte` WRITE;
INSERT INTO `compte` VALUES (1,'quentin0133','Popol0133470');
UNLOCK TABLES;
