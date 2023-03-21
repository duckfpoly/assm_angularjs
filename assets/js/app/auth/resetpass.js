app.controller("resetpassCtrl",function ($scope, $rootScope, $http, dataService) {
    
  dataService.checkLogin();
  $rootScope.isLog = false;

  dataService.getStudents().then(function (response) {
    $scope.students = response.data;
  });

  $scope.submitResetpass = function () {

    var email = $scope.email
    var password = $scope.password
    var confirmpassword = $scope.confirmpassword

    const inputs = [  
      { name: 'email', label: 'Email',  value: email },  
      { name: 'password', label: 'Mật khẩu mới',  value: password },  
      { name: 'confirmpassword', label: 'Lại mật khẩu mới',  value: confirmpassword },
    ];
    inputs.forEach((input) => {
      if (!input.value) $scope[`error_${input.name}`] = `Vui lòng nhập ${input.label.toLowerCase()}`;
    });
    $scope.removeErrReg = function() {
      inputs.forEach(input => {if(!input.value) $scope[`error_${input.name}`] = null});
    }
    
    if(!inputs.some(input => $scope[`error_${input.name}`])){
      const students = $scope.students.find(function (item) {
        $scope.student = item.id
        return item.email === email;
      });
      if (students) {
        if (password === confirmpassword) {
          $rootScope.isLog = true;
          $scope.action({ password: password })
        } 
        else {
          $rootScope.isLog = false;
          swal("Oh no!", "Mật khẩu nhập lại không đúng !", "warning");
        }
      } 
      else {
        $rootScope.isLog = false;
        swal("Oh no!", "Sinh viên không tồn tại !", "warning");
      }
    }
  };

  $scope.action = function (values) {
    try {
      Swal.fire({
        icon: 'success',
        title: 'Đặt lại mật khẩu thành công :)',
        text: "Đăng nhập thôi nào !",
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(()=>{
        dataService.updateStudent($scope.student, values)
        window.location.href = "#!login";
      }, 2000)
    }
    catch (e) {
      $rootScope.isLog = false;
      swal("False!", "Đặt lại mật khẩu thất bại !", "warning");
    }
  }
});