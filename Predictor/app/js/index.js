const $ = require('jquery');
var _ = require('lodash');
var toastr = require('toastr');
var ps = require('perfect-scrollbar');
var moment = require('moment');
var c3 = require('c3');

// most jQuery plugins don't work unless jQuery is on the window as well :-/

window.$ = window.jQuery = $;
window.c3 = c3;
window._ = _;
window.toastr = toastr;
window.ps = ps;
window.moment = moment;


require("angular");
require("angular-ui-router");
require("angular-bootstrap");
require("angular-cookies");
require("angular-perfect-scrollbar");

const ngModule = angular.module("app", ["ui.router", "ui.bootstrap", "ngCookies", "perfect_scrollbar"]);

require("./config")(ngModule);
require("./services")(ngModule);
require("./directives")(ngModule);
require("./controllers")(ngModule);
require("./common")(ngModule);
