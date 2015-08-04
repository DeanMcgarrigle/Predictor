export default ngModule => {
    require("./home")(ngModule);
    require("./login")(ngModule);
    require("./error")(ngModule);
};