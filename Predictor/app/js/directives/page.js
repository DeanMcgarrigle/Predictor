export default ngModule => {

    ngModule.directive('page', function () {

        return {
            restrict: 'E',
            template: require('./page.html'),
            scope: {
                isOpen: "@"
            },
            controllerAs: "vm",
            controller: function ($scope, $cookies) {
                var vm = this;
                vm.currentState = '';
                $scope.$on('$stateChangeSuccess',
                    function (event, toState) {
                        vm.currentState = toState.name;

                    });

            },
            link: function ($scope, elem) {
                $scope.$on('is-open-toggled', function (e, d) {
                    $scope.isOpen = d;

                });

            }
        };
    });
};
