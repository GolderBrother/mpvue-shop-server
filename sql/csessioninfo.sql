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

 Date: 19/09/2018 10:15:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for csessioninfo
-- ----------------------------
DROP TABLE IF EXISTS `csessioninfo`;
CREATE TABLE `csessioninfo`  (
  `open_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `uuid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `skey` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_time` timestamp(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `last_visit_time` timestamp(0) NOT NULL DEFAULT '0000-00-00 00:00:00',
  `session_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_info` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`open_id`) USING BTREE,
  INDEX `open_id`(`open_id`) USING BTREE,
  INDEX `skey`(`skey`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of csessioninfo
-- ----------------------------
INSERT INTO `csessioninfo` VALUES ('ob79J5PSQY-7_HNEx7kzHbA9mqBc', 'cd95be68-60cd-4b81-bbbb-a4e3d7db7b93', '625b0c303a9b54b24abd517f3c01aa36a0ef20a9', '2018-09-19 10:09:45', '2018-09-19 09:56:21', 'a10LPJxiw0q6aOfKdkNEHQ==', '\'{\"openId\":\"ob79J5PSQY-7_HNEx7kzHbA9mqBc\",\"nickName\":\"漫漫余生灬\",\"gender\":1,\"language\":\"zh_CN\",\"city\":\"Xiamen\",\"province\":\"Fujian\",\"country\":\"China\",\"avatarUrl\":\"https://wx.qlogo.cn/mmopen/vi_32/sqicFCgiaheqBFbTYPA54Oa7xwBb3hBGPr80oJoCDmd74OO08Wf5lzAt2iaEicnzibM1FVW2GebJGCwgGttWLK41EzA/132\",\"watermark\":{\"timestamp\":1535184522,\"appid\":\"wxd2677ab83f7a0569\"}}\'');

SET FOREIGN_KEY_CHECKS = 1;
