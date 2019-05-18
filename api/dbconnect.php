<?php
//run by php -S 127.0.0.1:8080
try{
  $hostname = "localhost";
  $port = 3306;
  $dbname = "lakesidedb";
  $username = "maxpol";
  $pswd= "maxpol";
     $pdo = new PDO("mysql:host=$hostname;dbname=$dbname;", $username,  $pswd);
    } catch (PDOException $e) {
      echo "Failed to get DB handle: " . $e->getMessage() . "\n";
      exit;
    }
 ?>
