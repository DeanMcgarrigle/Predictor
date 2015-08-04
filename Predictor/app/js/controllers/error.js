export default ngModule => {
    var controllerId = 'error';

    ngModule.controller(controllerId, function ($location, $scope, $rootScope, $cookies, $interval, $q, common) {

        var vm = this;

        vm.terminalName = $cookies.get('terminalName');
        console.log(vm.terminalName);

        vm.title = "Error";

        activate();

        function activate() {
            common.activateController([error()], controllerId)
                .then(function () {

                });
        }

        function error() {

            var interval, i = 1;

            function doStuff() {
                if (i < 5) {
                    document.getElementById("countdown").innerHTML = 5 - i;
                    i++;
                } else {
                    clearInterval(interval);
                    console.log("redirecting...",vm.terminalName);

                    $location.path(vm.terminalName + '/dashboard');
                }
            }

            interval = setInterval(doStuff, 1000);
        }
    })
}