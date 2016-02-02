"use strict";
namespace app.Services {
  export class HomeService {

    public infoResource;

    public getAll(){
      return this.infoResource.query();
    }
    public getInfo(infoId){
      return this.infoResource.get({id:infoId});
    }
    public saveInfo(info) {
      return this.infoResource.save(info).$promise;
    }
    public updateInfo(info){
      return this.infoResource.update({id: info._id},info).$promise;
    }
    public deleteInfo(infoId){
      return this.infoResource.delete({_id:infoId}).$promise;
    }


    constructor(private $resource: ng.resource.IResourceService) {
      this.infoResource = $resource('/info/:id', null,
    {
      'update': {method:'PUT'}
    });
    }
  }

  angular.module('app').service('HomeService', HomeService);
}
