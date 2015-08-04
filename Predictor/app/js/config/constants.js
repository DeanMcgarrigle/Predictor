export default ngModule => {

    var routes = [];

    routes.push({
        name: "login",
        config: {url: "/login", template: require("../templates/login.html")},
        hideNav: true
    });

    routes.push({
        name: "home",
        config: {url: "/", template: require("../templates/home.html"), icon: "th-large"}
    });

    routes.push({
        name: "error",
        config: {url: "/error", template: require("../templates/error.html")},
        hideNav: true
    });

    ngModule.constant("routes", routes);
};