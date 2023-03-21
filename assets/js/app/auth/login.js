app.controller("loginCtrl", function ($scope, $rootScope, dataService, $location) {
  
  dataService.checkLogin();
  $rootScope.isLog = false;

  var users = [];
  dataService.getStudents().then(res => { users = res.data })
  
  $scope.submitLogin = function () {

    $scope.inputsLogin = [  
      { name: 'username', label: 'Username',  value: $scope.username },  
      { name: 'password', label: 'Password',  value: $scope.password },  
    ];
    
    $scope.inputsLogin.forEach((input) => {
      if (!input.value) {
        $scope[`error_${input.name}`] = `Vui lòng nhập ${input.label.toLowerCase()}`;
      } 
    });

    $scope.removeErrLogin = function() {
      $scope.inputsLogin.forEach((input) => {
        if (!input.value) $scope[`error_${input.name}`] = null
      });
    }

    var check = $scope.inputsLogin.some(input => $scope[`error_${input.name}`]) 

    if(!check){
      const account = users.find((item) => {
        return item.username === $scope.username && item.password === $scope.password ? item : false
      });
      if (account) {
        $scope.actionLogin(account)
      } 
      else {
        $rootScope.isLog = false;
        swal.fire({
          icon: 'warning',
          title: 'Đăng nhập thất bại :(',
          text: 'Sai tên đăng nhập hoặc mật khẩu !',
        })
      }
    } 

  };
  
  $scope.actionLogin = function(account) {
    $rootScope.isLog = true;
    $rootScope.student = account
    sessionStorage.setItem("user", JSON.stringify(account));
    Swal.fire({
      icon: 'success',
      title: 'Đăng nhập thành công ! :)',
      showConfirmButton: false,
      timer: 2000
    })
    $location.path('#!index');
  }
});
