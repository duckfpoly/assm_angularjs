app.controller('navCtrl',($scope,$rootScope,menuFactory)=>{
  
  $scope.param_url = $rootScope.router
  $scope.listMenu = menuFactory.listMenu()
  $scope.setActive = (menu) => {
    angular.forEach($scope.listMenu, (m) => {
      $('#'+m.title).removeClass('active')
      m.active = false;
    });
    menu.active = true;
  }
})

app.factory('menuFactory',($rootScope) => {
  return {
    listMenu: () => {
      return [
        {
          name: 'Trang chủ',
          path: '#!index',
          title: 'index',
          active: false
        },
        {
          name: 'Giới thiệu',
          path: '#!about',
          title: 'about',
          active: false
        },
        {
          name: 'Liên hệ',
          path: '#!contact',
          title: 'contact',
          active: false
        },
        {
          name: 'Tin tức',
          path: '#!blog',
          title: 'blog',
          active: false
        },
        {
          name: 'Góp ý',
          path: '#!feedback',
          title: 'feedback',
          active: false
        },
        {
          name: 'Hỏi đáp',
          path: '#!answer',
          title: 'answer',
          active: false
        }
        ,
        {
          name: 'Bài thi',
          path: '#!courses',
          title: 'courses',
          active: false
        }
      ]
    },
    getUser: () => {
      return $rootScope.student
    }
  }
});

