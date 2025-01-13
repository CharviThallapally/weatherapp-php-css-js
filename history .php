<?php
include 'db.php';

$result = $conn->query("SELECT city_name FROM search_history ORDER BY search_time DESC LIMIT 5");
$history = [];

while ($row = $result->fetch_assoc()) {
    $history[] = $row['city_name'];
}

echo json_encode($history);
?>
