app.controller("quiz-result", function ($scope, $rootScope, $routeParams, dataService) {
  $scope.id_course = $routeParams.id

  if(!$scope.id_course){
    if($scope.id_course == '') {
      window.location.href = "#!index"
    }
  }
  
  dataService.getSubjects().then(result => {
    result.data.forEach(element => { if($scope.id_course === element.Id) $scope.name_quiz = element.Name });
  });

  dataService.getQuiz($scope.id_course).then(res => {
    $scope.quiz = res.data.slice(0,5)
    dataService.getStudentresult().then(response => {
      $scope.quiz.forEach(quiz => {
        response.data.forEach(resultt => {
          if (resultt.id_user === $rootScope.student.id && resultt.id_course === $scope.id_course) {
            document.querySelector('#point').innerHTML = resultt.point + ' Điểm'
            resultt.answer.forEach(answer => { 
              if (answer.question == quiz.Id && answer.choose == quiz.AnswerId){
                document.getElementById(answer.choose).classList.add('true')
                document.getElementById(quiz.AnswerId).classList.add('true')
              }else {
                document.getElementById(quiz.AnswerId).classList.add('true')
                document.getElementById(answer.choose).classList.add('false')
              }
            })
          }
        })
      })
    })
  })
})