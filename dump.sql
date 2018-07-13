-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.6.13 - MySQL Community Server (GPL)
-- Операционная система:         Win32
-- HeidiSQL Версия:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных onlinetester
CREATE DATABASE IF NOT EXISTS `onlinetester` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `onlinetester`;

-- Дамп структуры для таблица onlinetester.answer
CREATE TABLE IF NOT EXISTS `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.answer: ~6 rows (приблизительно)
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
REPLACE INTO `answer` (`id`, `text`) VALUES
	(1, 'Петя'),
	(2, 'фва'),
	(3, 'выфа'),
	(4, 'Военный'),
	(5, 'Джон Кеннеди'),
	(6, 'Франклин Рузвельт'),
	(7, 'Рональд Рейган');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.issues
CREATE TABLE IF NOT EXISTS `issues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `textIssues` tinytext,
  `type` int(11) DEFAULT NULL,
  `answer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_issues_answer` (`answer`),
  KEY `FK_issues_type_issues` (`type`),
  CONSTRAINT `FK_issues_answer` FOREIGN KEY (`answer`) REFERENCES `answer` (`id`),
  CONSTRAINT `FK_issues_type_issues` FOREIGN KEY (`type`) REFERENCES `type_issues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.issues: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
REPLACE INTO `issues` (`id`, `textIssues`, `type`, `answer`) VALUES
	(1, 'Кто дядя Вася?', 1, 4),
	(2, 'sda', 2, 3),
	(3, 'Кто из президентов США написал свой собственный рассказ про Шерлока Холмса?', 1, 7);
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.issus_to_answer
CREATE TABLE IF NOT EXISTS `issus_to_answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_issues` int(11) DEFAULT NULL,
  `id_answer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_issus_to_answer_issues` (`id_issues`),
  KEY `FK_issus_to_answer_answer` (`id_answer`),
  CONSTRAINT `FK_issus_to_answer_answer` FOREIGN KEY (`id_answer`) REFERENCES `answer` (`id`),
  CONSTRAINT `FK_issus_to_answer_issues` FOREIGN KEY (`id_issues`) REFERENCES `issues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.issus_to_answer: ~8 rows (приблизительно)
/*!40000 ALTER TABLE `issus_to_answer` DISABLE KEYS */;
REPLACE INTO `issus_to_answer` (`id`, `id_issues`, `id_answer`) VALUES
	(1, 1, 3),
	(2, 1, 1),
	(3, 1, 4),
	(4, 2, 3),
	(5, 2, 3),
	(6, 3, 5),
	(7, 3, 7),
	(8, 3, 6);
/*!40000 ALTER TABLE `issus_to_answer` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.role: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
REPLACE INTO `role` (`id`, `name`, `type`) VALUES
	(1, 'Студент', '/student'),
	(2, 'Преподватель', '/techer'),
	(3, 'Админнистратор', '/admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.sessions: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
REPLACE INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('QjCxkLlOf5G8ivpikA4ixaYxxuqyo8Yj', 1531581414, '{"cookie":{"originalMaxAge":86400000,"expires":"2018-07-14T13:21:24.533Z","secure":false,"httpOnly":true,"path":"/"},"passport":{"user":{"auth":true,"id":1,"name":"Петр Петров","email":"admin@admin.com","role":"Студент","role_type":"/student"}}}'),
	('tttU_1obelzqzXcZdK-fdnqvMb4VcPyP', 1531496432, '{"cookie":{"originalMaxAge":86400000,"expires":"2018-07-13T15:40:04.047Z","secure":false,"httpOnly":true,"path":"/"},"passport":{"user":{"auth":true,"id":1,"name":"Петр Петров","email":"admin@admin.com","role":"Студент","role_type":"/student"}}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.statustests
CREATE TABLE IF NOT EXISTS `statustests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tittlestate` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.statustests: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `statustests` DISABLE KEYS */;
REPLACE INTO `statustests` (`id`, `tittlestate`) VALUES
	(1, 0),
	(2, 1);
/*!40000 ALTER TABLE `statustests` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.studentfortests
CREATE TABLE IF NOT EXISTS `studentfortests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adddata` date NOT NULL,
  `student` int(11) DEFAULT NULL,
  `test` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `score` int(11) DEFAULT '0',
  `compldata` date DEFAULT '0000-00-00',
  PRIMARY KEY (`id`),
  KEY `student` (`student`),
  KEY `test` (`test`),
  KEY `status` (`status`),
  CONSTRAINT `FK_studentfortests_statustests` FOREIGN KEY (`status`) REFERENCES `statustests` (`id`),
  CONSTRAINT `FK_studentfortests_tests` FOREIGN KEY (`test`) REFERENCES `tests` (`id`),
  CONSTRAINT `FK_studentfortests_users` FOREIGN KEY (`student`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.studentfortests: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `studentfortests` DISABLE KEYS */;
REPLACE INTO `studentfortests` (`id`, `adddata`, `student`, `test`, `status`, `score`, `compldata`) VALUES
	(1, '2018-07-08', 1, 1, 1, 0, '0000-00-00'),
	(2, '2018-07-07', 1, 2, 1, 0, '0000-00-00'),
	(3, '2018-07-04', 1, 3, 1, 0, '0000-00-00'),
	(4, '0000-00-00', 1, 4, 2, 50, '2018-07-06'),
	(5, '2018-07-09', 1, 3, 1, 0, '0000-00-00'),
	(6, '2018-07-09', 1, 3, 2, 9, '0000-00-00'),
	(7, '2018-07-09', 1, 3, 2, 9, '0000-00-00'),
	(8, '2018-07-13', 1, 5, 1, 0, '0000-00-00');
/*!40000 ALTER TABLE `studentfortests` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.subjects
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.subjects: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
REPLACE INTO `subjects` (`id`, `title`) VALUES
	(1, 'Математика'),
	(2, 'Русский'),
	(3, 'Физика'),
	(4, 'Литература'),
	(5, 'История');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.testisssues
CREATE TABLE IF NOT EXISTS `testisssues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_test` int(11) DEFAULT NULL,
  `id_issues` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_test` (`id_test`),
  KEY `id_issues` (`id_issues`),
  CONSTRAINT `FK_testIsssues_issues` FOREIGN KEY (`id_issues`) REFERENCES `issues` (`id`),
  CONSTRAINT `FK_testIsssues_tests` FOREIGN KEY (`id_test`) REFERENCES `tests` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.testisssues: ~4 rows (приблизительно)
/*!40000 ALTER TABLE `testisssues` DISABLE KEYS */;
REPLACE INTO `testisssues` (`id`, `id_test`, `id_issues`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 5, 3),
	(4, 5, 1);
/*!40000 ALTER TABLE `testisssues` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.tests
CREATE TABLE IF NOT EXISTS `tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `subject` int(11) DEFAULT NULL,
  `datacreate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tests_subjects` (`subject`),
  KEY `creator` (`creator`),
  CONSTRAINT `FK_tests_subjects` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id`),
  CONSTRAINT `FK_tests_users` FOREIGN KEY (`creator`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.tests: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
REPLACE INTO `tests` (`id`, `creator`, `title`, `subject`, `datacreate`) VALUES
	(1, 2, 'Логические операторы', 1, '2018-07-06'),
	(2, 2, 'Протоны', 2, '2018-07-06'),
	(3, 2, 'Ионы', 3, '2018-07-06'),
	(4, 2, 'asdasd', 2, '2018-07-09'),
	(5, 2, 'История США', 5, '2018-07-13');
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.type_issues
CREATE TABLE IF NOT EXISTS `type_issues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы onlinetester.type_issues: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `type_issues` DISABLE KEYS */;
REPLACE INTO `type_issues` (`id`, `name_type`) VALUES
	(1, 'Выбор значения'),
	(2, 'Ввести значение');
/*!40000 ALTER TABLE `type_issues` ENABLE KEYS */;

-- Дамп структуры для таблица onlinetester.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(50) NOT NULL DEFAULT '0',
  `password` varchar(50) NOT NULL DEFAULT '0',
  `role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role` (`role`),
  CONSTRAINT `FK_users_role` FOREIGN KEY (`role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='Таблица со списком пользователей\r\n\r\nПользователь :\r\nname         - ФИО пользователя\r\nlogin          - Логин пользователя\r\npassword  - Пароль ( хэш пароля sha)';

-- Дамп данных таблицы onlinetester.users: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
	(1, 'Петр Петров', 'admin@admin.com', '20e0cbcd3cf233b748ebc24193b9afa7bfd8636b', 1),
	(2, 'Иван Иванов', 'ivan@admin.com', '20e0cbcd3cf233b748ebc24193b9afa7bfd8636b', 3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
