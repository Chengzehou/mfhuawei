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

if (isset($_POST['username'])) {
    $name = $_POST['username'];
    $result = $conn->query("select * from user where username = '$name'");
    if ($result->fetch_assoc()) { //存在
        echo true;  //1
    } else { //不存在
        echo false;  //空隙''
    }
};

//接收用户注册的信息
if (isset($_POST['submit'])) {
    $user = $_POST['username'];
    $phone =$_POST['phone'];
    $id = $_POST['id'];
    $pass = sha1($_POST['password']);
    
    //执行插入的sql语句。
    $conn->query("insert user values(null,'$user','$phone','$id','$pass',NOW())");
    //如果注册成功，跳到登录页面
    header('location:http://localhost/HUAWEI_MALL/src/html/signin.html');
}