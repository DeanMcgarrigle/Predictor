export default ngModule => {

    ngModule.factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {

        return {
            response: function (response) {

                if(response.status == 204){

                    //console.log("Response Error 204");
                    $location.path('error');
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    //console.log("Response Error 401", rejection);
                    $location.path('login');
                }
                return $q.reject(rejection);
            }
        }
    }])
        .config(['$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider) {

            //Http Intercpetor to check auth failures for xhr requests
            $locationProvider.html5Mode({
                enabled: false
            });


            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) { $httpProvider.defaults.headers.get = {}; } // Answer
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

            $httpProvider.interceptors.push('authHttpResponseInterceptor');

        }])

        .filter('orderObjectBy', function () {
            return function (items, field, reverse) {
                var filtered = [];
                angular.forEach(items, function (item) {
                    filtered.push(item);
                });
                filtered.sort(function (a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
                if (reverse) filtered.reverse();
                return filtered;
            };
        });



};