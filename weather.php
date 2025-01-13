<?php
include 'db.php'; // Include database connection

if (isset($_POST['city'])) {
    $city = $_POST['city'];

    // Store city search in the database
    $stmt = $conn->prepare("INSERT INTO search_history (city_name) VALUES (?)");
    $stmt->bind_param("s", $city);
    $stmt->execute();
    $stmt->close();

    // Fetch weather data from OpenWeather API
    $api_key = "350368bd7f1fab475c582efd4372438b"; // Replace with your API key
    $url = "http://api.openweathermap.org/data/2.5/weather?q=$city&appid=$api_key&units=metric";

    $response = file_get_contents($url);
    if ($response === FALSE) {
        echo json_encode(['error' => 'Error occurred while fetching weather data']);
        exit;
    }

    $weather_data = json_decode($response, true);

    if ($weather_data['cod'] == 200) {
        echo json_encode($weather_data);
    } else {
        echo json_encode(['error' => 'City not found']);
    }
}
?>
