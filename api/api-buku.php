<?php

$db_host = "sql12.freesqldatabase.com";
$db_user = "sql12806547";
$db_pass = "CNMUQIev1r";
$db_name = "sql12806547";
$db_port = 3306;

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port,);

if ($conn->connect_error) {
    die("Koneksi Gagal: " . $conn->connect_error);
}

$buku = array();
$sql = "SELECT * FROM stok_buku";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['harga']  = (int)$row['harga'];
        $row['qty']    = (int)$row['qty'];
        $row['safety'] = (int)$row['safety'];

        $buku[] = $row;
    }
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 

echo json_encode($buku);

$conn->close();
?>