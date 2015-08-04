export default ngModule => {
    var serviceId = 'datacontext';

    ngModule.factory(serviceId, function datacontext($http, $rootScope, $cookies, common){

        var service = {
            getCurrentUser: getCurrentUser,
            userLogin: userLogin
        };

        return service;

        function getCurrentUser(){
            return $http.get('api/user').then(_onSuccess);
        }

        function userLogin(user) {
            return $http.post('api/login', user).success(_onSuccess).error(_onError);
        }

        function _onSuccess(data){
            return data.data;
        }

        function _onError(data) {
            return data;
        }

    });
}
