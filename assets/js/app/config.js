var app = angular.module("myApp", ["ngRoute"]);

app.service("dataService", function ($location, $rootScope,$http) {
  $rootScope.apiUrl = "http://localhost:3000/"
  $rootScope.emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const baseDb = 'db/'
  
  this.getSubjects = function () {
    return $http.get(baseDb+"Subjects.js");
  };

  this.getStudents = function () {
    return axios.get(`${$rootScope.apiUrl}students`);
  };

  this.showStudents = function (id) {
    return axios.get(`${$rootScope.apiUrl}students${id}`);
  };

  this.addStudent = function (data) {
    return axios.post(`${$rootScope.apiUrl}students`,data);
  };
 
  this.updateStudent = function (id,data) {
    return axios.patch(`${$rootScope.apiUrl}students/${id}`,data);
  };

  this.getStudentresult = () => {
    return axios.get(`${$rootScope.apiUrl}student_results`);
  };

  this.postStudentresult = (data) => {
    return axios.post(`${$rootScope.apiUrl}student_results`,data);
  };

  this.updateStudentresult = (id,data) => {
    return axios.patch(`${$rootScope.apiUrl}student_results/${id}`,data);
  };

  this.checkLogin = () => {
    if($rootScope.student != null) $location.path("#!index");
  }
  
  this.checkLogin2 = () => {
    if($rootScope.student == null) window.location.href = "#!index";
  }

  this.getQuiz = (id_quiz) => {
    return $http.get(`Quizs/${id_quiz}.js`)
  }

});

app.run(function ($rootScope,$location) {
  var user = sessionStorage.getItem("user")
  if (user) {
    if (user != null) {
      $rootScope.student = JSON.parse(sessionStorage.getItem("user")) 
    }
    else {
      $rootScope.student = null;
      sessionStorage.clearItem("user");
    }
  } else {
    $rootScope.student = null;
  }
  $rootScope.router = $location.path().slice(1,$location.path().length)
  $rootScope.logoff = function () {
    $rootScope.student = null;
    sessionStorage.removeItem("user");
    swal.fire({
      icon: 'success',
      title: 'Đăng xuất thành công ! :)',
      showConfirmButton: true,
      timer: 2000
    })
  }
});

