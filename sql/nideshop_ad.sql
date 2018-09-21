/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50617
 Source Host           : localhost:3306
 Source Schema         : mpvue-shop

 Target Server Type    : MySQL
 Target Server Version : 50617
 File Encoding         : 65001

 Date: 19/09/2018 10:21:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for nideshop_ad
-- ----------------------------
DROP TABLE IF EXISTS `nideshop_ad`;
CREATE TABLE `nideshop_ad`  (
  `id` smallint(5) UNSIGNED NOT NULL,
  `ad_position_id` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `media_type` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `end_time` int(11) NOT NULL DEFAULT 0,
  `enabled` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
