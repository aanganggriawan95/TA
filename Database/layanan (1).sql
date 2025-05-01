-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2025 at 02:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `layanan`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_barang`
--

CREATE TABLE `data_barang` (
  `Id_Barang` int(4) NOT NULL,
  `Id_Pelanggan` int(4) NOT NULL,
  `Jenis_Barang` varchar(20) NOT NULL,
  `Merek` varchar(20) NOT NULL,
  `Model` varchar(20) NOT NULL,
  `Nomor_Seri` varchar(20) NOT NULL,
  `Keluhan_Barang` text NOT NULL,
  `Status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_barang`
--

INSERT INTO `data_barang` (`Id_Barang`, `Id_Pelanggan`, `Jenis_Barang`, `Merek`, `Model`, `Nomor_Seri`, `Keluhan_Barang`, `Status`) VALUES
(11, 1, 'Laptop', 'HP', '14sndksfhsjfns', '2764872fgje', 'Restart otomatis terus', 'Selesai'),
(12, 1, 'Laptop', 'HP', '14sndksfhsjfns', '2764872fgje', 'Restart otomatis terus', 'Selesai'),
(13, 1, 'Laptop', 'HP', '14sndksfhsjfns', '2764872fgje', 'Restart otomatis terus', 'Selesai'),
(14, 1, 'Laptop', 'HP', '14sndksfhsjfns', '2764872fgje', 'Restart otomatis terus', 'Selesai');

-- --------------------------------------------------------

--
-- Table structure for table `data_pelanggan`
--

CREATE TABLE `data_pelanggan` (
  `Id_Pelanggan` int(4) NOT NULL,
  `Nama` varchar(50) NOT NULL,
  `Telephone` varchar(13) NOT NULL,
  `Alamat` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_pelanggan`
--

INSERT INTO `data_pelanggan` (`Id_Pelanggan`, `Nama`, `Telephone`, `Alamat`) VALUES
(1, 'Rini', '089512324353', 'jakarta');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'isnanadifatul82@gmail.com', '1234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_barang`
--
ALTER TABLE `data_barang`
  ADD PRIMARY KEY (`Id_Barang`),
  ADD KEY `Nama` (`Id_Pelanggan`);

--
-- Indexes for table `data_pelanggan`
--
ALTER TABLE `data_pelanggan`
  ADD PRIMARY KEY (`Id_Pelanggan`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_barang`
--
ALTER TABLE `data_barang`
  MODIFY `Id_Barang` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `data_pelanggan`
--
ALTER TABLE `data_pelanggan`
  MODIFY `Id_Pelanggan` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_barang`
--
ALTER TABLE `data_barang`
  ADD CONSTRAINT `data_barang_ibfk_1` FOREIGN KEY (`Id_Pelanggan`) REFERENCES `data_pelanggan` (`Id_Pelanggan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
