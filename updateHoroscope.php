<?php

if($_SERVER["REQUEST_METHOD"] == "POST") {
  

    $addHoroscope = new AddHoroscope();
    $databaseResult = $addHoroscope->getHoroscope();
    echo json_encode($databaseResult);
}

    class AddHoroscope {

      function __construct() {
        include_once("database.php");
        $this->database = new Database();
    }

      public function getHoroscope() {
        $query = $this->database->connection->prepare("SELECT * FROM horoscopelist;");
        $query->execute();
        $result = $query->fetchAll();

        if(empty($result)) {
          return array("error" => "Kunde ej hämta studenter");
        }
        return $result;
      }
    }









 ?>
