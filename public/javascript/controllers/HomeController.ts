``'use strict';
namespace app.Controllers {
  export class HomeController {

    public info = {};



    public createInfo(){
      this.HomeService.saveInfo(this.info).then((res)=>{
        this.$location.path('/')
      })
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService
    ) {
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
