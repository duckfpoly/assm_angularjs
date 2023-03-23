app.controller("profileCtrl", function ($scope,$rootScope, $location, dataService) {

  dataService.checkLogin2()

  $scope.router = $location.url()
  if($scope.router.includes('?tab=info')){
    $scope.active_info = ['active','show']
  }else if($scope.router.includes('?tab=change_pass')){
    $scope.active_change_pass = ['active','show']
  }else if($scope.router.includes('?tab=show_result')){
    $scope.active_show_result = ['active','show']
  }else {
    $scope.auto_active = ['active','show']
  }


  $scope.removeErr = function () {
    $scope.error_old_password = undefined
    $scope.error_new_password = undefined
    $scope.error_confirm_new_password = undefined
  }
  
  $scope.changePass = function () {

    $scope.inputsChangePass = [  
      { name: 'old_password', label: 'Mật khẩu cũ',  value: $scope.old_password },  
      { name: 'new_password', label: 'Mật khẩu mới',  value: $scope.new_password },  
      { name: 'confirm_new_password', label: 'Nhập lại mật khẩu mới', value: $scope.confirm_new_password },  
    ];

    $scope.inputsChangePass.forEach((input) => {
      if (!input.value) {
        $scope[`error_${input.name}`] = `Vui lòng nhập ${input.label.toLowerCase()}`;
      }
      else if(input.name == 'old_password' && $scope.old_password !== $rootScope.student.password){
        $scope[`error_${input.name}`] = 'Mật khẩu cũ không khớp !';
      }
      else if (input.name == 'new_password' && $scope.new_password.match($scope.old_password)) {
        $scope[`error_${input.name}`] = 'Mật khẩu mới trùng mật khẩu cũ !';
      }
      else if (input.name == 'confirm_new_password' && $scope.new_password !== $scope.confirm_new_password) {
        $scope[`error_${input.name}`] = 'Mật khẩu nhập lại không khớp !';
      }
      // $scope.inputsChangePass.some((input) => $scope[`error_${input.name}`]) 
      // ? '' 
      // // : $scope.processChangePass($scope.new_password)
      // : console.log(true);
    });

    if($scope.error_confirm_new_password == undefined  && $scope.error_old_password == undefined && $scope.error_old_password == undefined){
      console.log(true);
    }
  }

  $scope.processChangePass = (new_password) => {
    Swal.fire({
      icon: 'success',
      title: 'Đổi mật khẩu thành công :)',
      text: "Đăng nhập lại sẽ có hiệu lực !",
      showConfirmButton: false,
      timer: 2000
    })
    // xử lý update dữ liệu user 
    setTimeout(() => {
      dataService.updateStudent($rootScope.student.id,{password:new_password})
    },2000)
  }



  $scope.getData = (callback) => {
    axios.get(`${$rootScope.apiUrl}student_results`)
    .then(response => {
        var arr = []
        response.data.forEach(element => {
          if(element.id_user == $rootScope.student.id) arr.push(element)
        });
        return arr
      })
      .then(callback)
      .catch(error => {
        console.log(error);
      })
  }

  $scope.showData = (results) => {
    document.querySelector('#myTbody').innerHTML = results.map(item => {
      return `
        <tr>
          <td>${item.id_course}</td>
          <td>${item.point}</td>
          <td><span class="text-${item.point >= 5 ? 'success' : 'danger'} fw-bold">${item.point >= 5 ? 'Pass' : 'Fails'}</span></td>
          <td>
            <a href="#!result?id=${item.id_course}" class="btn btn-sm btn-outline-dark">Xem kết quả</a>
            <a href="#!quiz?id=${item.id_course}" class="btn btn-sm btn-secondary">Làm lại</a>
          </td>
        </tr>
      `
    }).join(' ')
  }

  if($rootScope.student != null){
    $scope.getData($scope.showData)
  }



})