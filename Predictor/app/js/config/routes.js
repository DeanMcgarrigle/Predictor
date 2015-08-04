export default ngModule => {
    ngModule.config(function ($stateProvider, $urlRouterProvider, $httpProvider, routes) {

        $urlRouterProvider.otherwise("/");

        routes.forEach(function (route) {
            $stateProvider.state(route.name, route.config);
        });
    });
};