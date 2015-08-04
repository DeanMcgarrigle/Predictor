export default ngModule => {
    var controllerId = 'loginCtrl';

    ngModule.controller(controllerId, function ($location, common, datacontext) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Login';
        vm.login = loginFn;
        vm.user = {};
        vm.error = undefined;
        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () {

                });
        }

        function loginFn() {

            if(vm.user.userName == undefined || vm.user.password == undefined){
                return vm.error = {message: "Please enter a valid username or password"};
            }
            else {
                return datacontext.userLogin(vm.user)
                    .then(function (data) {
                        $location.path('/');
                        return data;
                    }, function (err) {
                        if(err.status == 401)
                            vm.error = {message: "Username or password is incorrect"};
                    });
            }
        }
    })
}