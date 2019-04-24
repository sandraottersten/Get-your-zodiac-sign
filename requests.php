<?php

include "addHoroscope.php";
// include "updateHoroscope.php";
// include "deleteHoroscope.php";


if($_SERVER["REQUEST_METHOD"] == "POST") {
  try{
    if($_POST["collectionType"] == "horoscope") {

      if($_POST["action"]=="addHoroscope") {
        $addHoroscope = new AddHoroscope();
        $databaseResult = $addHoroscope->getHoroscope();
        echo json_encode($databaseResult);
      }
      // if($_POST["action"]=="addNew") {
      //   $name = $_POST['newStudentName'];
      //   $age = $_POST['newStudentAge'];
      //
      //   $studentHandler = new StudentHandler();
      //   $databaseResult = $studentHandler->addStudent($name, $age);
      //   echo json_encode($databaseResult);
      // }
      // if($_POST["action"]=="deleteStudent") {
      //   $id = $_POST['studentId'];
      //
      //   $studentHandler = new StudentHandler();
      //   $databaseResult = $studentHandler->deleteStudent($id);
      //   echo json_encode($databaseResult);
      // }
    }
  } catch(Exception $error) {
    http_response_code(500);
    echo json_encode($error->getMessage());
  }
}
?>
