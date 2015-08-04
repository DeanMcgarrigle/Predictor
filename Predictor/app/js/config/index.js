export default ngModule => {
    require("./values")(ngModule);
    require("./routes")(ngModule);
    require("./constants")(ngModule);
    require("./interceptor")(ngModule);
};