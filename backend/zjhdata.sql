-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-12-09 08:59:14
-- 服务器版本： 8.0.17
-- PHP 版本： 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `zjhdata`
--

-- --------------------------------------------------------

--
-- 表的结构 `a_manage_list`
--

CREATE TABLE `a_manage_list` (
  `ID` int(11) NOT NULL COMMENT '账号ID',
  `am_account` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `am_limit` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限',
  `am_password` varchar(100) NOT NULL COMMENT '密码'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='账号管理表';

--
-- 转存表中的数据 `a_manage_list`
--

INSERT INTO `a_manage_list` (`ID`, `am_account`, `am_limit`, `am_password`) VALUES
(7, 'admin', 'manager', 'e10adc3949ba59abbe56e057f20f883e'),
(8, 'zhengjiahao', 'manager', 'fcea920f7412b5da7be0cf42b8c93759');

-- --------------------------------------------------------

--
-- 表的结构 `book_list`
--

CREATE TABLE `book_list` (
  `book_ID` int(11) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_type` varchar(255) DEFAULT NULL,
  `book_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `book_list`
--

INSERT INTO `book_list` (`book_ID`, `book_name`, `book_type`, `book_status`) VALUES
(1, '动物世界', '动物科普类', 1),
(2, 'python程序设计', '程序设计', 2),
(3, '概率论与数理统计', '数学学科书', 1);

-- --------------------------------------------------------

--
-- 表的结构 `b_rent_list`
--

CREATE TABLE `b_rent_list` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `book_ID` int(20) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_status` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_ID` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `b_rent_list`
--

INSERT INTO `b_rent_list` (`id`, `book_ID`, `book_name`, `book_status`, `update_time`, `user_ID`) VALUES
('2cbed7e0-5744-11ec-a1c5-e375d05103db', 4, '名侦探柯南', 2, '2021-12-07 17:58:06', 'admin'),
('3dc72510-57f8-11ec-a06d-63032010bc7f', 1, '动物世界', 1, '2021-12-08 15:27:04', 'hhx'),
('d6efc150-5697-11ec-8807-c780356a40ea', 1, '动物世界', 2, '2021-12-06 21:24:28', 'hhx'),
('ff3ab250-5697-11ec-8807-c780356a40ea', 2, 'python程序设计', 2, '2021-12-06 21:25:36', 'admin');

-- --------------------------------------------------------

--
-- 表的结构 `e_distribute_list`
--

CREATE TABLE `e_distribute_list` (
  `ID` int(20) NOT NULL,
  `ed_college` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学院',
  `ed_class` int(30) NOT NULL COMMENT '教室',
  `ed_classID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '教室号',
  `ed_equiptype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备类别',
  `ed_equipcount` int(20) NOT NULL COMMENT '设备数量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='设备分布表';

-- --------------------------------------------------------

--
-- 表的结构 `e_total_list`
--

CREATE TABLE `e_total_list` (
  `ID` int(20) NOT NULL,
  `et_college` varchar(100) NOT NULL COMMENT '学院',
  `et_classID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '教室号',
  `et_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备类别',
  `et_equipID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备编号',
  `et_equipstatus` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '设备状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='设备总表';

--
-- 转存表中的数据 `e_total_list`
--

INSERT INTO `e_total_list` (`ID`, `et_college`, `et_classID`, `et_type`, `et_equipID`, `et_equipstatus`) VALUES
(1, '大数据学院', 'C0-456', '投影仪', 'pro001', '正常'),
(2, '交通', 'C0-556', '电脑显示屏', 'sztu001', '损坏'),
(3, '创设', 'C1-796', '单反照相机', 'sztu201', '正常');

-- --------------------------------------------------------

--
-- 表的结构 `e_usage_list`
--

CREATE TABLE `e_usage_list` (
  `ID` int(20) NOT NULL,
  `eu_resourcetype` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资源分类',
  `eu_resourceID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资源编号',
  `eu_time` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '时间',
  `eu_oprationtype` int(20) NOT NULL COMMENT '操作类型',
  `eu_count` int(30) NOT NULL COMMENT '数量',
  `eu_userID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '操作人信息',
  `eu_remark` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='设备使用情况表';

--
-- 转存表中的数据 `e_usage_list`
--

INSERT INTO `e_usage_list` (`ID`, `eu_resourcetype`, `eu_resourceID`, `eu_time`, `eu_oprationtype`, `eu_count`, `eu_userID`, `eu_remark`) VALUES
(1, 'book', '001', '2021-11-21', 3, 1, 'lab001', '送了一本书');

-- --------------------------------------------------------

--
-- 表的结构 `rent_list`
--

CREATE TABLE `rent_list` (
  `ID` int(20) NOT NULL,
  `user_ID` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '借出用户ID',
  `rent_time` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '借出时间',
  `return_time` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '归还时间',
  `resourse_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资源类型',
  `resourse_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资源编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='出借表';

--
-- 转存表中的数据 `rent_list`
--

INSERT INTO `rent_list` (`ID`, `user_ID`, `rent_time`, `return_time`, `resourse_type`, `resourse_ID`) VALUES
(1, 'lab001', '2021-11-22', '∞', 'Book', '001');

-- --------------------------------------------------------

--
-- 表的结构 `resource_keys`
--

CREATE TABLE `resource_keys` (
  `ID` int(11) NOT NULL,
  `NUMBER` int(11) NOT NULL COMMENT '钥匙编号',
  `LABDOOR_NUM` int(11) NOT NULL COMMENT '实验室编号',
  `STATUS` int(11) NOT NULL COMMENT '钥匙状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转存表中的数据 `resource_keys`
--

INSERT INTO `resource_keys` (`ID`, `NUMBER`, `LABDOOR_NUM`, `STATUS`) VALUES
(1, 1, 101, 1);

-- --------------------------------------------------------

--
-- 表的结构 `r_distribute_list`
--

CREATE TABLE `r_distribute_list` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `rd_userID` varchar(255) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `rd_status` int(11) DEFAULT NULL,
  `resourceName` varchar(255) DEFAULT NULL,
  `resourcetype` varchar(255) DEFAULT NULL,
  `resourceID` int(11) DEFAULT NULL,
  `count` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `r_distribute_list`
--

INSERT INTO `r_distribute_list` (`id`, `rd_userID`, `update_time`, `rd_status`, `resourceName`, `resourcetype`, `resourceID`, `count`) VALUES
('2a9c4e50-57fa-11ec-a06d-63032010bc7f', 'admin', '2021-12-08 15:44:35', 1, '烧杯', '化学实验器材', 9, 10),
('96369510-575c-11ec-a9da-db4a3ba25677', 'admin', '2021-12-07 22:01:03', 1, '烧杯', '化学实验器材', 9, 100);

-- --------------------------------------------------------

--
-- 表的结构 `r_manage_list`
--

CREATE TABLE `r_manage_list` (
  `resourceID` int(50) NOT NULL,
  `resourceName` varchar(255) DEFAULT NULL,
  `resourcetype` varchar(255) DEFAULT NULL,
  `count` bigint(20) DEFAULT NULL,
  `rm_updatetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `r_manage_list`
--

INSERT INTO `r_manage_list` (`resourceID`, `resourceName`, `resourcetype`, `count`, `rm_updatetime`) VALUES
(5, '面包板', '微机实验器材', 150, '2021-12-07 17:56:19'),
(9, '烧杯', '化学实验器材', 790, '2021-12-08 15:44:35'),
(10, '250mL量筒', '化学实验器材', 800, '2021-12-07 18:25:31'),
(11, '万用表', '物理实验器材', 500, '2021-12-07 20:52:27'),
(12, '试管', '化学实验器材', 500, '2021-12-08 15:30:40');

-- --------------------------------------------------------

--
-- 表的结构 `test`
--

CREATE TABLE `test` (
  `test_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `test`
--

INSERT INTO `test` (`test_id`) VALUES
(120),
(122),
(111),
(211);

-- --------------------------------------------------------

--
-- 表的结构 `webresource_list`
--

CREATE TABLE `webresource_list` (
  `ID` int(11) NOT NULL,
  `web_ID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '服务器ID',
  `web_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用途',
  `web_status` int(10) NOT NULL COMMENT '状态'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='实验室服务器';

--
-- 转存表中的数据 `webresource_list`
--

INSERT INTO `webresource_list` (`ID`, `web_ID`, `web_type`, `web_status`) VALUES
(1, 'LAB001', 'SEARCH', 1);

--
-- 转储表的索引
--

--
-- 表的索引 `a_manage_list`
--
ALTER TABLE `a_manage_list`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `book_list`
--
ALTER TABLE `book_list`
  ADD PRIMARY KEY (`book_ID`);

--
-- 表的索引 `b_rent_list`
--
ALTER TABLE `b_rent_list`
  ADD PRIMARY KEY (`id`,`book_ID`);

--
-- 表的索引 `e_distribute_list`
--
ALTER TABLE `e_distribute_list`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `e_total_list`
--
ALTER TABLE `e_total_list`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `e_usage_list`
--
ALTER TABLE `e_usage_list`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `rent_list`
--
ALTER TABLE `rent_list`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `resource_keys`
--
ALTER TABLE `resource_keys`
  ADD PRIMARY KEY (`ID`);

--
-- 表的索引 `r_distribute_list`
--
ALTER TABLE `r_distribute_list`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `r_manage_list`
--
ALTER TABLE `r_manage_list`
  ADD PRIMARY KEY (`resourceID`);

--
-- 表的索引 `webresource_list`
--
ALTER TABLE `webresource_list`
  ADD PRIMARY KEY (`ID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `a_manage_list`
--
ALTER TABLE `a_manage_list`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '账号ID', AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `book_list`
--
ALTER TABLE `book_list`
  MODIFY `book_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `e_distribute_list`
--
ALTER TABLE `e_distribute_list`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `e_total_list`
--
ALTER TABLE `e_total_list`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `e_usage_list`
--
ALTER TABLE `e_usage_list`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `rent_list`
--
ALTER TABLE `rent_list`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `resource_keys`
--
ALTER TABLE `resource_keys`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `r_manage_list`
--
ALTER TABLE `r_manage_list`
  MODIFY `resourceID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `webresource_list`
--
ALTER TABLE `webresource_list`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
