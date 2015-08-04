export default ngModule => {

    ngModule.directive('sidebar', function ($window, $cookies, $interval, routes, datacontext) {

        return {
            restrict: 'E',
            scope: true,
            template: require('./sidebar.html'),
            controller: function ($scope) {

                var interval = undefined;

               interval = $interval( function () {
                    $scope.terminalName = $cookies.get('terminalName');
                    $scope.terminalDisplayName = $cookies.get('terminalDisplayName');

                    if($scope.terminalName != undefined)
                    {
                        $interval.cancel(interval);
                    }

                }, 1000);

                $scope.routes = _.filter(routes, function (r) {
                    return !r.hideNav;
                });


                $scope.toggleSidebar = toggleSidebar;
                $scope.logout = logout;

                function toggleSidebar() {
                    console.log("sidebar toggled");
                    $scope.isOpen = !$scope.isOpen;
                    $scope.$emit('is-open-toggled', $scope.isOpen);
                }

                //$scope.currentUser = $cookies.get('currentUser');

                function logout() {
                    console.log("logging out...");
                    return datacontext.logout();
                }
            },
            link: function ($scope, elem) {

                var mobileView = 992;

                angular.element($window).bind('resize', function () {
                    $scope.isOpen = $window.innerWidth >= mobileView;
                    $scope.$apply();
                    $scope.$emit('is-open-toggled', $scope.isOpen);
                });



            }
        };
    });
};