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

 Date: 19/09/2018 10:40:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for nideshop_address
-- ----------------------------
DROP TABLE IF EXISTS `nideshop_address`;
CREATE TABLE `nideshop_address`  (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `user_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `address` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `mobile` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `address_detail` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of nideshop_address
-- ----------------------------
INSERT INTO `nideshop_address` VALUES (1, 'james', '1', '福建厦门', '18450087586', 1, '集美区软件园三期');
INSERT INTO `nideshop_address` VALUES (2, '何玉硕', 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c', '广东省 广州市 海珠区', '020-81167888', 0, '新港中路397号');

SET FOREIGN_KEY_CHECKS = 1;
