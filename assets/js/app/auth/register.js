app.controller("registerCtrl",function ($scope, $rootScope, $location, dataService) {
  
  dataService.checkLogin();
  $rootScope.isLog = false;
  
  $scope.submitRegister = function () {

    $scope.inputsRegis = [  
      { name: 'username', label: 'Username',  value: $scope.username },  
      { name: 'password', label: 'Password',  value: $scope.password },  
      { name: 'fullname', label: 'Họ và tên', value: $scope.fullname },  
      { name: 'email',    label: 'Email',     value: $scope.email    },
    ];

    $scope.inputsRegis.forEach((input) => {
      if (!input.value) {
        $scope[`error_${input.name}`] = `Vui lòng nhập ${input.label.toLowerCase()}`;
      }
      else if (input.name == 'email' && !$scope.email.match($rootScope.emailPattern)) {
        $scope[`error_${input.name}`] = `${input.label.toLowerCase()} không hợp lệ!`;
      }
    });

    $scope.removeErrReg = function() {
      $scope.inputsRegis.forEach((input) => {
        if (!input.value) {
          $scope[`error_${input.name}`] = null
        } 
        else if (!$scope.username.match($rootScope.emailPattern)) {
          $scope[`error_${input.name}`] = null
        }
      });
    }

    $scope.inputsRegis.some((input) => $scope[`error_${input.name}`]) ? '' :  $scope.Register($scope.username,$scope.password,$scope.fullname,$scope.email)
  }

  $scope.Register = function(username,password,fullname,email) {

    $scope.datas = {
      username: username,
      password: password,
      fullname: fullname,
      email:    email,
    };

    dataService.getStudents().then(response => {
      $scope.students = response.data;
      const emailStudents = $scope.students.find(item => {
        return item.email === email  ? true : false;
      });
      const usernameStudents = $scope.students.find(item => {
        return item.username === username ? true : false;
      });
      if (emailStudents) {
        $rootScope.isLog = false;
        Swal.fire({ icon: 'error', title: 'Email đã tồn tại !' })
      } 
      else if(usernameStudents) {
        $rootScope.isLog = false;
        Swal.fire({ icon: 'error', title: 'Username đã tồn tại !' })
      }
      else {
        try {
          $rootScope.isLog = true;
          Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công :)',
            text: "Đăng nhập thôi nào !",
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(()=>{
            dataService.addStudent($scope.datas)
            window.location.href = "#!login"
            // $location.path('#!login');
          }, 2000)
        }
        catch (e) {
          console.log(e);
          $rootScope.isLog = false;
          Swal.fire({ icon: 'error', title: 'Đăng ký tài khoản thất bại !' })
        }
      }
    });
  }
});