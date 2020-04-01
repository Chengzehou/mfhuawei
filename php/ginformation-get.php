<?php
//设置中文字符
header('content-type:text/html;charset=utf-8');

//define用来声明一个常量，一般约定常量名大写
define('HOST','localhost');//定义主机名
define('USERNAME','root');//定义用户名
define('PASSWORD','');//定义密码
define('DBNAME','huaweimall');//定义数据库名
$conn = new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
if (isset($_GET['sid'])) {
    $sid = $_GET['sid']; //接收前端传入的sid
    $result = $conn->query("select * from phonelist where sid=$sid");
    echo json_encode($result->fetch_assoc());
}

?>