angular.module('app.services', [])


/*.constant('apiUrls', {

    loadSymptoms: baseUrl+'symptoms',
    loadIssues: baseUrl+'issues',
    loadIssueInfo: baseUrl+'issues',
    loadDiagnosis: baseUrl+'diagnosis',
    loadSpecialisations: baseUrl+'diagnosis/specialisations',
    loadBodyLocations: baseUrl+'body/locations',
    loadBodySublocations: baseUrl+'body/locations/',
    loadBodySublocationSymptoms: baseUrl+'symptoms',
    loadProposedSymptoms: baseUrl+'symptoms/proposed',
    loadRedFlagText: baseUrl+'redflag'
})*/

/*.factory('getToken', [function(){

    var token = [];
    var getData = function($http) {
        return $http.get("http://localhost:90/token_generator.php")
        .then(function(response) {
          token = response.data;
          return token
        });
    }
    return {
        getData: getData 
    };

}])*/

.service('APIInterceptor', function ($rootScope, $q) {
      var service = this;

      service.responseError = function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('unauthorized');
        }
        return $q.reject(response);
      };
    })


 .service('LoginService', function ($http,Backand) {
    var objectName = 'users';
    var filesActionName = 'files';
    var service = this;
    var baseDataUrl="http://192.168.43.46/tokengenerator.php"

      service.signin = function (email,password) {
        //call Backand for sign in
        return Backand.signin(email,password);
      };

      service.anonymousLogin= function(){
        // don't have to do anything here,
        // because we set app token att app.js
      };
     service.getToken = function () {
     return $http.get(baseDataUrl)
    .then(
      function success (response) {
        return response.data;
      },
      function error (reason) {
        // Do something!
      }
    );
};

      service.socialSignin = function (provider) {
        return Backand.socialSignin(provider);
      };

      service.socialSignup = function (provider) {
        return Backand.socialSignup(provider);
      };

      service.signout = function () {
        return Backand.signout();
      };

      service.signup = function(firstName, lastName, email, password, confirmPassword,parameters){
        return Backand.signup(firstName, lastName, email, password, confirmPassword,parameters);
      };

      service.getDetail = function(){
        return Backand.user.getUserDetails();
        //console.log("In Service")
      };


      service.getUserData=function(){
       return Backand.object.getList("users", {
        "pageSize": 20,
        "pageNumber": 1,
        "filter": [
          {
            "fieldName": "email",
            "operator": "equals",
            "value":this.getEmail()
          }
                ],
       "sort": []
          })
      };

    service.getEmail=function(){
      return Backand.user.getUsername();
    };

    service.getDoctorsList=function(){
             return Backand.object.getList("users", {
        "pageSize": 20,
        "pageNumber": 1,
        "filter": [
              {
                "fieldName": "type",
                "operator": "equals",
                "value": "Doctor"
              }
                 ],
         "sort": []
          })
      };


      service.get=function(docId){

        return Backand.object.getOne("users",docId);

      };
     

       service.getUsername = function(){
        return Backand.user.getUsername();
    };

    service.upload=function(filename,filedata){
        
         var data = filedata.substr(filedata.indexOf(',') + 1, filedata.length);
         return Backand.file.upload(objectName, filesActionName, filename, data);

    };

     /* service.getEmail=function(){
        return Backand.user.;
      }*/

    });
 

 

 
 