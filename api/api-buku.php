<?php
// 1. PENGATURAN KONEKSI DATABASE
$db_host = "sql12.freesqldatabase.com";
$db_user = "sql12806547";
$db_pass = "CNMUQIev1r";
$db_name = "sql12806547";
$db_port = 3306;

// Buat koneksi
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port,);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi Gagal: " . $conn->connect_error);
}

$buku = array();
$sql = "SELECT * FROM stok_buku";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Ambil setiap baris data
    while($row = $result->fetch_assoc()) {
        // Penting: Ubah tipe data angka agar menjadi number di JSON
        $row['harga']  = (int)$row['harga'];
        $row['qty']    = (int)$row['qty'];
        $row['safety'] = (int)$row['safety'];
        
        // Masukkan ke array $buku
        $buku[] = $row;
    }
}

// 3. MENGIRIM RESPON JSON
// Beritahu browser bahwa ini adalah data JSON
header('Content-Type: application/json');
// Beritahu browser lain (Vue) agar diizinkan mengambil data
header('Access-Control-Allow-Origin: *'); 

// Ubah array PHP menjadi JSON dan cetak
echo json_encode($buku);

// 4. TUTUP KONEKSI
$conn->close();
?>