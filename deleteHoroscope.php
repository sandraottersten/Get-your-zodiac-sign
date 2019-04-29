<?php

    session_start();

// ger tillgång till sidan via DELETE, kollar om det finns något i SESSION och tar bort det

    if($_SERVER["REQUEST_METHOD"] == "DELETE") {

      if(isset($_SESSION["myHoroscope"])) {
        unset($_SESSION["myHoroscope"]);

        echo json_encode(true);
      } else {
        echo json_encode(false);
      }
    }

 ?>
