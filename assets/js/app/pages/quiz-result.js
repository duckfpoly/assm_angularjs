app.controller("quiz-result", function ($scope, $rootScope, $routeParams, dataService) {
  $scope.id_course = $routeParams.id
  $rootScope.arr_result = []
  $rootScope.stt = 0
  $scope.student_mark_result = 0

  if(!$scope.id_course){
    if($scope.id_course == '') {
      window.location.href = "#!index"
    }
  }
  
  dataService.getSubjects().then(result => {
    result.data.forEach(element => {
      if($scope.id_course === element.Id) {
        $scope.name_quiz = element.Name
        $scope.show_result_quiz()
      } 
    });
  });

  $scope.show_result_quiz = function () {
    dataService.getStudentresult().then(response => {
      var results = response.data
      for(var i = 0; i < results.length; i++){
        if (results[i].id_user === $rootScope.student.id && results[i].id_course === $scope.id_course) {
          $scope.student_mark_result = results[i].mark
          $scope.ren_color(results[i].answer,results[i].id_user)
        } 
      } 
    })
  }


  $scope.ren_color = function (answer_list,id_user) {
    dataService.getQuiz($scope.id_course).then(res => {
      $scope.quiz = res.data.slice(0,5)
        $scope.quiz.forEach(quiz => {
          answer_list.forEach(answer => {
            if (answer.question == quiz.Id && answer.choose == quiz.AnswerId && id_user == $rootScope.student.id){
              // window.onload = function() {
                var elements = document.getElementsByTagName('input');
                var element = elements[answer.choose - 1];
                if (element) {
                  console.log(element.id);
                  // Do something with the element
                } else {
                  console.log('Element not found');
                }
              // };
              
              // document.getElementById(answer.choose).classList.add('true')
            }else {
              // document.getElementById(quiz.AnswerId).classList.add('true')
              // document.getElementById(answer.choose).classList.add('false')
            }
          })
        });
    })
  }

})