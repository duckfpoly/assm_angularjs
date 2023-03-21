app.controller("profileCtrl", function ($scope,$rootScope, $http,dataService) {
  dataService.checkLogin2()
  $scope.quizTest = []
  $scope.id_user = $rootScope.student.id
  dataService.getStudentresult()
    .then(response => {
      var results = response.data
      for(var i = 0; i < results.length; i++){
        if (results[i].id_user === $scope.id_user) {
          $scope.quizTest.push(results[i])
          $scope.mark = results[i].mark
        } 
      }
    })
    dataService.getSubjects()
      .then(result => {
        result.data.forEach(element => {
          if($scope.id_course === element.Id){
            $scope.name_quiz_test = element.Name
            console.log($scope.name_quiz_tes);
          }
        });
      });


    $scope.removeErr = function () {
      $scope.error_old_password = undefined
      $scope.error_new_password = undefined
      $scope.error_confirm_new_password = undefined
    }
    
    $scope.changePass = function () {
      var old_password = $scope.old_password
      var new_password = $scope.new_password
      var confirm_new_password = $scope.confirm_new_password
      $scope.error_old_password = (old_password === undefined) ? 'Vui lòng nhập mật khẩu cũ' : null;
      $scope.error_new_password = (new_password === undefined) ? 'Vui lòng nhập mật khẩu mới' : null;
      $scope.error_confirm_new_password = (confirm_new_password === undefined) ? 'Vui lòng nhập lại mật khẩu mới' : ((new_password !== confirm_new_password) ? 'Mật khẩu nhập lại không khớp !' : null);
      if ($scope.error_old_password === null && $scope.error_new_password === null && $scope.error_confirm_new_password === null) {
        swal({
          title: "Đổi mật khẩu thành công :)",
          text: "Đăng nhập lại sẽ có hiệu lực !",
          icon: "success",
        });
      }

    }


})