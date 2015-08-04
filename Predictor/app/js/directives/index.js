export default ngModule => {
    require("./sidebar")(ngModule);
    require("./page")(ngModule);
    require("./validation")(ngModule);
    require("./currentuser")(ngModule);
};