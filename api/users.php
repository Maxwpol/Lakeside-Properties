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
  $data=json_encode($decoded_input);
$sql = "INSERT INTO users (data) VALUES ('$data')";
$stmt=$pdo->prepare($sql);
$stmt->execute();
if ($stmt) {
    $res["Message"]="Success";
    echo json_encode($res);
} else {
    $res["Message"]="Error";
    echo json_encode($res);
}
 }else if($_SERVER['REQUEST_METHOD'] === 'GET'){
if (isset($_GET['id'])) {
   $id=$_GET['id'];
       $stmt = $pdo->query("SELECT * FROM users where id=$id");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
}if (isset($_GET['user']) && isset($_GET['pass'])) {
      $user=$_GET['user'];
      $pass=$_GET['pass'];
      $stmt = $pdo->query("SELECT * FROM users where  data->>'$.username'='$user'");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
}else{
    $stmt = $pdo->query("SELECT * FROM users");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
}

 }else if($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $decoded_input = json_decode(file_get_contents("php://input"), true);
    header('Content-type: application/json');
    $id= $decoded_input["id"];
    unset($decoded_input["id"]);
    $data=json_encode($decoded_input);
    $sql = "UPDATE users SET data='$data' where id=$id";
    $stmt=$pdo->prepare($sql);
    $stmt->execute();
    if ($stmt) {
        $res["Message"]="Success";
        echo json_encode($res);
    } else {
        $res["Message"]="Error";
        echo json_encode($res);
    }

}else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    $decoded_input = json_decode(file_get_contents("php://input"), true);
    header('Content-type: application/json');
    $id= $decoded_input["id"];
    unset($decoded_input["id"]);
    $data=json_encode($decoded_input);
   // print_r($data);
    $sql = "DELETE from users where id=$id";
    $stmt=$pdo->prepare($sql);
    $stmt->execute();
    if ($stmt) {
        $res["Message"]="Success";
        echo json_encode($res);
    } else {
        $res["Message"]="Error";
        echo json_encode($res);
    }
}else{

}
?>
