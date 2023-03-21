app.config(function ($routeProvider) {
  $routeProvider
    .when("/index", {
      templateUrl: "template/pages/home.html",
    })
    .when("/about", {
      templateUrl: "template/pages/about.html",
    })
    .when("/contact", {
      templateUrl: "template/pages/contact.html",
    })
    .when("/blog", {
      templateUrl: "template/pages/blog.html",
    })
    .when("/feedback", {
      templateUrl: "template/pages/feedback.html",
    })
    .when("/answer", {
      templateUrl: "template/pages/answer.html",
    })
    .when("/courses", {
      templateUrl: "template/courses/index.html",
    })
    .when("/quiz", {
      templateUrl: "template/courses/quiz.html",
    })
    .when("/profile", {
      templateUrl: "template/profile.html",
    })
    .otherwise({
      redirectTo: "/index",
    });
});

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/register", {
      templateUrl: "template/auth/register.html",
    })
    .when("/login", {
      templateUrl: "template/auth/login.html",
    })
    .when("/resetpass", {
      templateUrl: "template/auth/resetpass.html",
    })
    .when("/result", {
      templateUrl: "template/courses/result.html",
    })
    .otherwise({
      redirectTo: "/index",
    });
});