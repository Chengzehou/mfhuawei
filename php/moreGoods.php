<?php
//设置中文字符
header('content-type:text/html;charset=utf-8');

//define用来声明一个常量，一般约定常量名大写
define('HOST','localhost');//定义主机名
define('USERNAME','root');//定义用户名
define('PASSWORD','');//定义密码
define('DBNAME','huaweimall');//定义数据库名
$conn = new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
$result = $conn->query("select * from phonelist");

$onepshow = 10;//每页显示10条数据；
$num = $result->num_rows;//总条数
$pages = ceil($num / $onepshow);//总页数（向上取整）

//获取前端页面传来的页码值
if(isset($_GET['page'])){
    $pagevalue = $_GET['page'];
}else{
    $pagevalue = 1;
}
$action = ($pagevalue - 1) * $onepshow;//每页最开始数据的位置，第一页，从0开始，第二页从10开始

//limit
//limit接收一个或者两个数字参数(整数)
//参1：数据开始位置的索引(从0开始)，偏移量
//参2：返回的记录集数目。
//limit 0,10  从偏移量0开始 取10条
//limit 10,10  从偏移量10开始 取10条
//limit 20,10 从偏移量20开始 取10条
$res = $conn->query("select * from phonelist limit $action,$onepshow");


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口



