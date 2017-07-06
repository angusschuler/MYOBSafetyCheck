<!DOCTYPE html>
<html>
<head>
<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}

th {text-align: left;}
</style>
</head>
<body>


<?php 
//--------------------------------------------------------------------------
// Example php script for fetching data from database
//--------------------------------------------------------------------------
$host = "safetycheck.database.windows.net";
$user = "SafetyCheck123";
$pass = "A1d2h3s4";
$databaseName = "SafetyCheckDB";

$tableName = "ajax_example";

$connectionOptions = array(
"Database" => $databaseName,
"Uid" => $user,
"PWD" => $pass
);

$q = $_GET['q'];

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
$query = "SELECT * FROM $tableName WHERE sex = '".$q."'";          //query
$results = sqlsrv_query($con, $query);        //fetch result    

//--------------------------------------------------------------------------
// 3) echo result as json 
//--------------------------------------------------------------------------
echo ("Reading data from table" . PHP_EOL);
if ($results == FALSE)
    echo (sqlsrv_errors());

echo "<table>
<tr>
<th>Name</th>
<th>Age</th>
</tr>";
while ($row = sqlsrv_fetch_array($results, SQLSRV_FETCH_ASSOC)) {
    echo "<tr>";
    echo "<td>" . $row['name'] . "</td>";
    echo "<td>" . $row['age'] . "</td>";
    echo "</tr>";
}
echo "</table>";    

sqlsrv_free_stmt($results);

?>

</body>
</html>