export default ngModule => {

    ngModule.directive('getCurrentUser', [function () {

        return {
            restrict: 'E',
            transclude: true,
            scope: {
                data: '='
            },
            template: "<span>{{data}}</span>",
            controller: function ($scope, datacontext) {

                function currentUser() {
                    return datacontext.getCurrentUser().then(function (data) {

                        $scope.data = data.displayName;
                        return data;
                    })
                }

                currentUser();

            }
        }
    }]);
}

