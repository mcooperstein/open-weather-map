angular.module('OWMApp', ['ngRoute'])

.value('owmCities', ['New York', 'Dallas', 'Chicago'])

.config(function ($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'home.html',
                controller: 'HomeCtrl as home'
            })
            .when('/cities/:city', {
                templateUrl: 'city.html',
                controller: 'CityCtrl',
                resolve: {
                    city: function (owmCities, $route, $location) {
                        var city = $route.current.params.city;
                        if (owmCities.indexOf(city) === -1) {
                            $location.path('/error');
                            return;
                        }
                        return city;
                    }
                }
            })
            .when('/error', {
                template: '<p>Error - Page Not Found</p>'
            });
    })
    .controller('HomeCtrl', function () {
        this.welcomeMessage = "Welcome Home";
    })
    .controller('CityCtrl', function ($scope, city) {
        $scope.city = city;
    });

/*.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function () {
        $location.path('/error');
    });
})*/
