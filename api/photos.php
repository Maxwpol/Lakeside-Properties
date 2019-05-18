<?php
//run by php -S 127.0.0.1:8080
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');

require('dbconnect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $decoded_input = json_decode(file_get_contents("php://input"), true);
  header('Content-type: application/json');
  $data = json_encode($decoded_input);
  $saved = 0;
  foreach ($decoded_input as $Photo) {
    $name = $Photo["name"];
    $extension = $Photo["extension"];
    $folder = $Photo["folder"];
    $photo = $Photo["photo"];
    $img=file_get_contents($photo);
    $file = $folder . $name . '.' . $extension;
    file_put_contents($file, $img);
    $saved++;
  }
  echo $saved;
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $decoded_input = json_decode(file_get_contents("php://input"), true);
  header('Content-type: application/json');
  $data = json_encode($decoded_input);
  $saved = 0;
  foreach ($decoded_input as $Photo) {
    $name = $Photo["name"];
    $extension = $Photo["extension"];
    $folder = $Photo["folder"];
    $photo = $Photo["photo"];
    $todelete = $folder . $name . "." . $extension;
    if (file_exists($todelete)) {
      unlink($todelete);
      $saved++;
    }
  }
  echo $saved;
}
