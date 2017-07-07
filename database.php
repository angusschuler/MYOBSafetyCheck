<?php 
$host = "safetycheck.database.windows.net";
$user = "SafetyCheck123";
$pass = "A1d2h3s4";
$databaseName = "SafetyCheckDB";

$tableName = "Hazard";

$connectionOptions = array(
"Database" => $databaseName,
"Uid" => $user,
"PWD" => $pass
);

$type = $_GET['t'];
$q = $_GET['q'];


// SELECT * FROM   {val})

//--------------------------------------------------------------------------
// 1) Connect to mysql database
//--------------------------------------------------------------------------

$con = sqlsrv_connect($host,$connectionOptions);
if (!$con) {
    die('Could not connect: ' . sqlsrv_errors($con));
}
//--------------------------------------------------------------------------
// 2) Query database for data
//--------------------------------------------------------------------------
if ($type == "Risks") {
    $q=json_decode($q);
    $query = "SELECT * FROM Hazard WHERE Name IN (";
    for ($i=0; $i < count($q); $i++) { 
        $query .= "'".$q[$i]."'";
        if ($i != count($q) - 1){
            $query .= ", ";
        }
    }
    $query .= ")";
    
} elseif ($type == "Hazards") {
    $query = "SELECT * FROM Hazard WHERE ID IN (SELECT IndustryHasHazard.Hazard FROM IndustryHasHazard WHERE IndustryHasHazard.Industry = ".intval($q).")";
}
$results = sqlsrv_query($con, $query);        //fetch result    

//--------------------------------------------------------------------------
// 3) echo result as json 
//--------------------------------------------------------------------------

if ($results == FALSE)
    echo null;

while ($row[] = sqlsrv_fetch_array($results, SQLSRV_FETCH_ASSOC)) {
    
}

sqlsrv_free_stmt($results);
echo json_encode($row);

?>