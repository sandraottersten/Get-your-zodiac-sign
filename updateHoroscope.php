<?php

session_start();


if($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['inputDate'];
    $updateHoroscope = new UpdateHoroscope();
    $databaseResult = $updateHoroscope->getHoroscope($date);
    echo json_encode($databaseResult);
}

    class UpdateHoroscope {

      function __construct() {
        include_once("database.php");
        $this->database = new Database();
    }

      public function getHoroscope($date) {
        $query = $this->database->connection->prepare("SELECT * FROM horoscopelist;");
        $query->execute();
        $result = $query->fetchAll();

        if(empty($result)) {
          return array("error" => "Kunde ej hämta horoskop");
        }

        $myHoroscope = checkHoroscope($date, $result);
        setSession($myHoroscope);
        return $myHoroscope;
      }
    }

// hämta alla horoskop, ta foreach och kolla vilka datum som stämmer, returnera horoscopesign.

    function checkHoroscope($date, $result) {

        $checkDate = new DateTime($date);
        $found = false;

        for($i = 0; $i < count($result) && !$found; $i++){
          $start = new DateTime($result[$i]['datefrom']);
          $stop = new DateTime($result[$i]['dateto']);

          if($start <= $checkDate && $checkDate <= $stop) {
            $output = $result[$i]['horoscopesign'];
            $found = true;
          } else {
            $output = 'finns ej';
          }
        }
        return $output;
    }

  function setSession ($myHoroscope) {
    if(isset($_SESSION["myHoroscope"])) {
      $_SESSION["myHoroscope"] = $myHoroscope;
    }
  }
 ?>
