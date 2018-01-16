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
var core_1 = require("@angular/core");
var SubmenuComponent = (function () {
    function SubmenuComponent() {
        this.menuChanged = new core_1.EventEmitter();
    }
    SubmenuComponent.prototype.ngOnInit = function () {
        console.log(this.appName);
    };
    SubmenuComponent.prototype.subMenuSelected = function (selectedMenu) {
        this.menuChanged.emit(selectedMenu);
    };
    return SubmenuComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SubmenuComponent.prototype, "appName", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SubmenuComponent.prototype, "menuChanged", void 0);
SubmenuComponent = __decorate([
    core_1.Component({
        selector: 'app-submenu',
        templateUrl: './submenu.component.html',
        styleUrls: ['./submenu.component.css'],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [])
], SubmenuComponent);
exports.SubmenuComponent = SubmenuComponent;
//# sourceMappingURL=submenu.component.js.map