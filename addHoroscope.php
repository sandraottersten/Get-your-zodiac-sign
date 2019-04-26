<?php

// session_start();
//
// if($_POST["action"] == "addHoroscope") {
//
//   // $myDate = $_POST["inputDate"];
//
//   if(isset($_SESSION["myHoroscope"])) {
//     $myHoroscope = $_SESSION["myHoroscope"];
//
//     echo json_encode($myHoroscope);
//   } else {
//     echo json_encode("Finns inget, addera horoskåp till session");
//     getHoroscope();
//   }
//
//
// }

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['inputDate'];
    $addHoroscope = new AddHoroscope();
    $databaseResult = $addHoroscope->getHoroscope($date);
    echo json_encode($databaseResult);
}

    class AddHoroscope {

      function __construct() {
        include_once("database.php");
        $this->database = new Database();
    }

      public function getHoroscope($date) {
        $query = $this->database->connection->prepare("SELECT * FROM horoscopelist;");
        $query->execute();
        $result = $query->fetchAll();
        // checkHoroscope();

        if(empty($result)) {
          return array("error" => "Kunde ej hämta horoskop");
        }
        return checkHoroscope($date); //$result
      }
    }

// hämta alla horoskop, ta foreach och kolla vilka datum som stämmer, returnera horoscopesign.

    function checkHoroscope($date) {
        $upperBound = new DateTime("03/15");
        $lowerBound = new DateTime("03/20");
        $checkDate = new DateTime($date);

        if ($lowerBound < $upperBound) {
            $between = $lowerBound <= $checkDate && $checkDate <= $upperBound;
        } else {
            $between = $checkDate <= $upperBound || $checkDate >= $lowerBound;
        }
        return $between;

}
 ?>
