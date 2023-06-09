app.controller("quiz-inner", ($scope, $rootScope, $routeParams, $interval, dataService) => {

  $scope.id_user = $rootScope.student.id
  $scope.param = $routeParams.act
  $scope.id_course = $routeParams.id
  $scope.name_course = null
  $scope.results = []
  $scope.mark = 0
  $scope.time_count = 15;

  var quizs = [];

  dataService.getQuiz($scope.id_course).then(res => { quizs = res.data.slice(0, 5) })

  if($rootScope.student != null){
    if($routeParams.id){
      dataService.getSubjects().then(response => {
        $scope.subjects = response.data
        const subjects = $scope.subjects.find(item => {
          if(item.Id === $routeParams.id){
            $scope.name_quiz = item.Name
            $scope.image_quiz = item.Logo
            return true
          }else {
            return false
          }
        });
        if(subjects){
          if($scope.param == 'start'){
            $scope.countDown()
          }else {
            $interval.cancel($scope.x);
          }
          $scope.getQuiz()
          $scope.chooseAnswer()
        }
        else {
          swal.fire({
            icon: 'error',
            title: 'Khoá học không tồn tại :)',
            showConfirmButton: false,
            timer: 2000
          })
          window.location.href = "#!index"
        }
      });
    }
    else {
      window.location.href = "#!index"
    }
  }
  else {
    swal.fire({
      icon: 'error',
      title: 'Vui lòng đăng nhập !',
    }).then(isConfirm =>{
      if(isConfirm){
        window.location.href = "#!login"
      }
    })
  }

  $scope.getQuiz = () => {
    $scope.quiz = quizs
    $scope.currentAnswer = 0
    $scope.pageSize = 1
    $scope.numberOfPages = () => {
      return Math.ceil($scope.quiz.length / $scope.pageSize)
    };
  }

  $scope.countDown = () => {
    $scope.countDownDate = new Date().getTime() + $scope.time_count * 60 * 1000;
    $scope.x = $interval(() => {
      var distance = $scope.countDownDate - new Date().getTime();
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      $scope.time = minutes + " : " + seconds;
      if (distance < 0) {
        $interval.cancel($scope.x);
        $scope.time = ''
        swal.fire({
          icon: 'error',
          title: 'Đã hết thời gian làm bài !',
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          $scope.mark_calc()
        })
      }
    }, 1000);
  }

  $scope.chooseAnswer = (value,value2) => {
    if(value != undefined && value2 !== undefined){
      $scope.results.forEach(element => {
        element.id == value ? element.checked = true : element.checked = false
      });
      const index = $scope.results.findIndex(item => item.question === value)
      if(index !== -1) {
        $scope.results[index].choose = value2
      }
      else {
        $scope.results.push({
          question:  value, 
          choose:    value2, 
          checked:   false
        })
      }
    }
  }

  $scope.endTest = () => { 
    Swal.fire({
      title: 'Bạn chắc chắn nộp bài?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        $interval.cancel($scope.x);
        Swal.fire({
          icon: 'success',
          title: 'Nộp bài thành công !',
          showConfirmButton: false,
          timer: 2000
        }).then(function() {
          $scope.mark_calc()
        })
      }
    })
  }

  $scope.mark_calc = () => {
    quizs.forEach(quiz => {
      $scope.results.forEach(answer => {
        if (quiz.Id === answer.question && quiz.AnswerId === answer.choose){
          $scope.mark += 2
        } else {
          $scope.mark += 0
        }
      });
    });
    $scope.final($scope.results,$scope.mark)
  }

  $scope.final = (arr_results,point) => {
    const resultFinal = {
      id_user: $rootScope.student.id, 
      id_course: $scope.id_course,
      point: point,
      answer: arr_results
    }
    try {
      var result2 = null
      dataService.getStudentresult().then(result => {
        result.data.forEach(element => {
          if(element.id_course == $scope.id_course && element.id_user == $rootScope.student.id){
            result2 = element
          }
        });
        if(result2 == null){
          dataService.postStudentresult(resultFinal)
        }else {
          dataService.updateStudentresult(result2.id,resultFinal)
        }
      })
      window.location.href = "#!/result?id="+ $scope.id_course
    }catch (err){
      console.log(err);
    }
  }
})