'use strict';
namespace app.Controllers{
  export class RentalDetailsController{
    public rental;

    constructor(
      private HomeService: app.Services.HomeService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      this.rental = HomeService.getInfo( $routeParams['id']);
    }
  }
}
