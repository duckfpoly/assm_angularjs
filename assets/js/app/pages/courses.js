app.controller("coursesCtrl", function ($scope,dataService, $location) {
  dataService.checkLogin2();
 
  dataService.getSubjects()
  .then(response => {
    $scope.courses = response.data;
    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.numberOfPages = function () {
      return Math.ceil($scope.courses.length / $scope.pageSize);
    };
  });
});