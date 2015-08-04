export default ngModule => {
    require("./filters")(ngModule);
    require("./common") (ngModule);
    require("./logger") (ngModule);
};