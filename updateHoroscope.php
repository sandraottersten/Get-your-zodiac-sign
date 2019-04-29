<?php

session_start();

// ger tillgång till sidan via POST, skapar en ny class och kör funktionen getHoroscope med det inskickade datumet

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['inputDate'];
    $updateHoroscope = new UpdateHoroscope();
    $databaseResult = $updateHoroscope->getHoroscope($date);
    echo json_encode($databaseResult);
}

    class UpdateHoroscope {

// ger tillgång till databasen

      function __construct() {
        include_once("database.php");
        $this->database = new Database();
    }

// skickar en förfrågan till databasen och hämtar ut alla horoskop. Kör sedan en funktion som plockar ut rätt horoskop och en som sätter SESSION

      public function getHoroscope($date) {
        $query = $this->database->connection->prepare("SELECT * FROM horoscopelist;");
        $query->execute();
        $result = $query->fetchAll();

        if(empty($result)) {
          return array("error" => "Kunde ej hämta horoskop");
        }
        $myHoroscope = checkHoroscope($date, $result);
        $output = setSession($myHoroscope);
        return $output;
      }
    }

// hämta alla horoskop, loopa igenom och kolla vilka datum som stämmer, returnera horoscopesign.

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

// om det finns något i SESSION, skriv över det

  function setSession ($myHoroscope) {
    if(isset($_SESSION["myHoroscope"])) {
      $_SESSION["myHoroscope"] = $myHoroscope;
      return true;
    } else {
      return false;
    }
  }
 ?>
