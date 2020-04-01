<?php
//设置中文字符
header('content-type:text/html;charset=utf-8');

//define用来声明一个常量，一般约定常量名大写
define('HOST', 'localhost'); //定义主机名
define('USERNAME', 'root'); //定义用户名
define('PASSWORD', ''); //定义密码
define('DBNAME', 'huaweimall'); //定义数据库名

//用 $ 声明一个变量
//php连接数据库   new mysqli(主机名，用户名，密码，数据库名)   连接数据库的类
$conn = new mysqli(HOST, USERNAME, PASSWORD, DBNAME);

//获取用户名和密码
if (isset($_POST['username']) && isset($_POST['password'])) {
    $user = $_POST['username'];
    $pass = sha1($_POST['password']); //加密和加密进行比较
    $result = $conn->query("select * from user where username='$user' and password = '$pass' ");
    if ($result->fetch_assoc()) {
        echo true;  //登录成功
    } else {
        echo false;  //用户名或者密码错误
    }
}