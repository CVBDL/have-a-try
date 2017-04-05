/**
 * Created by Chobits on 2017/4/5.
 */
$(document).ready(function () {
  $("#salary").on("input", function () {
    var num = document.getElementById("salary").value;
    document.getElementById("salary-num").innerHTML = num;
  })
})

$("#commit").on("click", function () {
  var pwdvalue = document.getElementById("pwd").value;
  var pwdconf = document.getElementById("repwd").value;
  var repwd = document.getElementById("repwd");
  if (pwdvalue != pwdconf)
  {repwd.setCustomValidity("重复密码与密码不匹配，请重新输入.")}
})
