"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = require("./decorator");
var util_1 = require("../utils/util");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.isLogin = undefined;
            // 退出登录，直接返回成功的状态
            res.json(util_1.getResponseData(true));
        }
    };
    LoginController.prototype.home = function (req, res) {
        var isLogin = req.session ? req.session.isLogin : undefined;
        if (isLogin) {
            res.send("<body>\n    <div class=\"login\">\n        <a href=\"/getData\">\u83B7\u53D6\u6570\u636E</a>\n        <a href=\"/logout\">\u9000\u51FA</a>\n        <a href=\"/showData\">\u5C55\u793A\u6570\u636E</a>\n    </div>\n</body>");
        }
        else {
            res.send("<body>\n    <div class=\"login\">\n        <form action=\"/login\" method=\"post\">\n            <input type=\"password\" name=\"password\">\n            <button type=\"submit\">\u767B\u5F55</button>\n        </form>\n    </div>\n</body>");
        }
    };
    __decorate([
        decorator_1.get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    __decorate([
        decorator_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    LoginController = __decorate([
        decorator_1.Controller
    ], LoginController);
    return LoginController;
}());
