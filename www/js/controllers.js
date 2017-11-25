angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope','$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {       


}])
.controller('issueDetailCtrl', ['$scope','$state','$http', '$stateParams','LoginService','tokenFactory','apiurls','languageFactory','formatFactory','apiServices','$rootScope','$window','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$http,$stateParams,LoginService,tokenFactory,apiurls,languageFactory,formatFactory,apiServices,$rootScope,$window,$location) {

$scope.data={
    'bodyConfig':'',
    'error':'',
    'issueDetails':[],
    'showDiv':false
  }


$scope.loadToken=function(){
   LoginService.getToken().then(function(response){

                  $scope.data.token = response;
                  console.log($scope.data.token);
                  loadIssueInfo();

              });
 }

  //console.log($scope.sublocationId);
   /* $http.get('http://localhost:90/token_generator.php').then(function(response){
    $scope.data.token=response.data;
    $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
    tokenFactory.storeToken($scope.data.token);
    console.log("Token"+$scope.data.token);
  },function(error){

    console.log("Error",error);
  })*/
  //loadIssues();
  //$scope.data.locationId=$stateParams.locaionId;
  //$scope.data.selectorStatus=$rootScope.selectorStatus;
   // console.log($rootScope.selectorStatus);
      function loadIssueInfo(){
      $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
      tokenFact ory.storeToken($scope.data.token);
      var url = apiurls.loadIssueInfo+'/'+$stateParams.issueId+'/info';
      generic_api_call(url, 'issueInfo','issueInfoError','issueInfoConfig');
     
      //console.log($rootScope.sublocationId);
}

function generic_api_call(url, scope_variable_name, scope_error_variable_name, scope_config_variable_name)
    {
      var extraArgs = 'token='+tokenFactory.storeToken()+'&language='+languageFactory.storeLanguage()+'&format='+formatFactory.storeFormat()
      url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;
      //$scope.data[scope_variable_name] = "loading data from web service...";
      apiServices.makeRequest({
        URL: url,
        method: 'GET'
            })
      .then(function (data) {
        $scope.data.issueDetails = data.data != '' ? data.data : 'No results found';
        $scope.data.bodyConfig = data.config;
        $scope.data.error = '';
        //console.log('success', data);
        //$scope.data.bodySublocations

        console.log($scope.data.issueDetails);
        $scope.data.showDiv=true;
       
      }, function (data) {
        $scope.data.bodySublocations = '';
        $scope.data.bodyConfig = '';
        $scope.data.error = data;
        console.log('error', data);
        return false;
      });
    }


}])
.controller('diagnoseCtrl', ['$scope','$state','$http', '$stateParams','LoginService','tokenFactory','apiurls','languageFactory','formatFactory','apiServices','$rootScope','$window','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

function ($scope,$state,$http,$stateParams,LoginService,tokenFactory,apiurls,languageFactory,formatFactory,apiServices,$rootScope,$window,$location) {      
 $scope.data={
    'bodySublocations':{},
    'bodyConfig':'',
    'error':'',
    'locationId':'',
    'selectorStatus':'',
    'selectedSymptoms':[],
    'diagnoseResult':'',
    'token':''
  }
  //console.log($scope.sublocationId);

     $scope.loadToken=function(){
   LoginService.getToken().then(function(response){

                  $scope.data.token = response;
                  console.log($scope.data.token);
                  loadDiagnosis();

              });
 }
  
  $scope.data.locationId=$stateParams.locaionId;
  $rootScope.locationId=$scope.data.locaionId;
  $scope.data.selectedSymptoms=$stateParams.symptoms;
  console.log("Selected Symptoms "+$scope.data.selectedSymptoms);
  //$scope.data.selectorStatus=$rootScope.selectorStatus;

   function loadDiagnosis(){  
     $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
      tokenFactory.storeToken($scope.data.token);    
    $scope.data.selectedSymptoms =$scope.data.selectedSymptoms.replace(/^"(.*)"$/, '$1');
     var symptoms = $scope.data.selectedSymptoms.split(',');
      var url = apiurls.loadDiagnosis+'?symptoms='+$scope.data.selectedSymptoms+'&gender='+$stateParams.gender+'&year_of_birth='+$stateParams.yearofbirth;
      generic_api_call(url, 'diagnosis','diagnosisError','diagnosisConfig');
      //console.log($rootScope.sublocationId);
    

}

function generic_api_call(url, scope_variable_name, scope_error_variable_name, scope_config_variable_name)
    {
      var extraArgs = 'token='+tokenFactory.storeToken()+'&language='+languageFactory.storeLanguage()+'&format='+formatFactory.storeFormat()
      url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;
      //$scope.data[scope_variable_name] = "loading data from web service...";
      apiServices.makeRequest({
        URL: url,
        method: 'GET'
            })
      .then(function (data) {
        $scope.data.diagnoseResult = data.data != '' ? data.data : 'No results found';
        $scope.data.bodyConfig = data.config;
        $scope.data.error = '';
        //console.log('success', data);
        //$scope.data.bodySublocations
        console.log($scope.data.diagnoseResult);
        //$scope.sublocationData.sublocation=$scope.data.bodySublocations[0].id
        //$rootScope.sublocation=$scope.sublocationData.sublocation;
        //$rootScope.sublocationId=$scope.sublocationData.sublocation;
        //console.log($scope.sublocationData.sublocation);
        //return false;
      }, function (data) {
        $scope.data.bodySublocations = '';
        $scope.data.bodyConfig = '';
        $scope.data.error = data;
        console.log('error', data);
        return false;
      });
    }
    $scope.sublocationData={
    'sublocation':''
}

}])
.controller('detailsCtrl', ['$scope','$stateParams','LoginService','$state','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,LoginService,$state,$rootScope) {

    $scope.doctor={};

//console.log($stateParams.docId);

  onDoctorDetails();

  function onDoctorDetails(){
    LoginService.get($stateParams.docId).then(function(response){

        $scope.doctor=response.data;
        console.log($scope.doctor);

    })
  }
  

//console.log($scope.doctors);


}])



.controller('doctorsCtrl', ['$scope','$stateParams','$rootScope','LoginService','$state', function($scope,$stateParams,$rootScope,LoginService,$state){

    $scope.doctor={};

    onGetData();

    function onGetData(){
        LoginService.getDoctorsList().then(function(response){

           $scope.doctor=response.data;
           //console.log($scope.doctor);

        })
    }




    
}])
   
.controller('searchDiseaseCtrl', ['$scope','$state','$http', '$stateParams','LoginService','tokenFactory','apiurls','languageFactory','formatFactory','apiServices','$rootScope','$window','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$http,$stateParams,LoginService,tokenFactory,apiurls,languageFactory,formatFactory,apiServices,$rootScope,$window,$location) {

$scope.data={
    'bodyConfig':'',
    'error':'',
    'issue':[],
    'token':''
  }



  /*$http.get('http://localhost:90/token_generator.php').then(function(response){
    $scope.data.token=response.data;
    $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
    tokenFactory.storeToken($scope.data.token);
    console.log("Token"+$scope.data.token);
  },function(error){

    console.log("Error",error);
  })*/

  //console.log($scope.sublocationId);
  //loadIssues();
  //$scope.data.locationId=$stateParams.locaionId;
  //$scope.data.selectorStatus=$rootScope.selectorStatus;
   // console.log($rootScope.selectorStatus);
   $scope.loadToken=function(){
   LoginService.getToken().then(function(response){

                  $scope.data.token = response;
                  console.log($scope.data.token);
                  loadIssues();

              });
 }
      function loadIssues(){
      $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
      tokenFactory.storeToken($scope.data.token);    
      var url = apiurls.loadIssues;
      generic_api_call(url, 'issues','issuesError','issuesConfig');
      //console.log($rootScope.sublocationId);
}

function generic_api_call(url, scope_variable_name, scope_error_variable_name, scope_config_variable_name)
    {
      var extraArgs = 'token='+tokenFactory.storeToken()+'&language='+languageFactory.storeLanguage()+'&format='+formatFactory.storeFormat()
      url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;
      //$scope.data[scope_variable_name] = "loading data from web service...";
      apiServices.makeRequest({
        URL: url,
        method: 'GET'
            })
      .then(function (data) {
        $scope.data.issue = data.data != '' ? data.data : 'No results found';
        $scope.data.bodyConfig = data.config;
        $scope.data.error = '';
        //console.log('success', data);
        //$scope.data.bodySublocations

        console.log($scope.data.issue);
       
      }, function (data) {
        $scope.data.bodySublocations = '';
        $scope.data.bodyConfig = '';
        $scope.data.error = data;
        console.log('error', data);
        return false;
      });
    }


}])
.controller('sublocationSymptomsCtrl', ['$scope','$state','$http', '$stateParams','LoginService','tokenFactory','apiurls','languageFactory','formatFactory','apiServices','$rootScope','$window','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$http,$stateParams,LoginService,tokenFactory,apiurls,languageFactory,formatFactory,apiServices,$rootScope,$window,$location) {

 $scope.data={
    'bodySublocationSymptoms':[],
    'bodyConfig':'',
    'error':'',
    'locationId':'',
    'selectorStatus':'',
    'selectedSymptoms':[],
    'gender':'',
    'yearofbirth':'',
    'sublocationId':'',
    'token':''
  }
  $scope.change = function(list, active){
        if (active)
            $scope.data.selectedSymptoms.push(list);
        else
            $scope.data.selectedSymptoms.splice($scope.data.selectedSymptoms.indexOf(list), 1);
            $rootScope.selectedSymptoms=$scope.data.selectedSymptoms;
            //console.log($scope.data.selectedSymptoms);
  }



  //console.log($scope.sublocationId);
  
     $scope.loadToken=function(){
     LoginService.getToken().then(function(response){

                  $scope.data.token = response;
                  console.log($scope.data.token);
                  loadBodySublocationSymptoms();

              });
 }
  
  //$scope.data.locationId=$stateParams.locaionId;
  //$scope.data.selectorStatus=$rootScope.selectorStatus;
    //console.log($rootScope.selectorStatus);
      function loadBodySublocationSymptoms(){
      $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
      tokenFactory.storeToken($scope.data.token);  
      var url = apiurls.loadBodySublocationSymptoms+'/'+$stateParams.sublocationId+'/'+$rootScope.selectorStatus;
      generic_api_call(url, 'bodySublocationSymptoms','bodySublocationSymptomsError','bodySublocationSymptomsConfig');
      //console.log($rootScope.sublocationId);
}

function generic_api_call(url, scope_variable_name, scope_error_variable_name, scope_config_variable_name)
    {
      var extraArgs = 'token='+tokenFactory.storeToken()+'&language='+languageFactory.storeLanguage()+'&format='+formatFactory.storeFormat()
      url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;
      //$scope.data[scope_variable_name] = "loading data from web service...";
      apiServices.makeRequest({
        URL: url,
        method: 'GET'
            })
      .then(function (data) {
        $scope.data.bodySublocationSymptoms = data.data != '' ? data.data : 'No results found';
        $scope.data.bodyConfig = data.config;
        $scope.data.error = '';
        //console.log('success', data);
        //$scope.data.bodySublocations

        console.log($scope.data.bodySublocationSymptoms);
        $scope.data.gender=$rootScope.gender;
        $scope.data.yearofbirth=$rootScope.yearOfBirth;
        $scope.data.selectorStatus=$rootScope.selectorStatus;
        $scope.data.locaionId=$rootScope.locaionId;
        $scope.data.sublocationId=$rootScope.sublocationId;
       console.log('Gender '+$scope.data.gender);
       console.log("yearofbirth"+$scope.data.yearofbirth);
        //$scope.sublocationData.sublocation=$scope.data.bodySublocations[0].id
        //$rootScope.sublocationId=$scope.sublocationData.sublocation;
        //console.log($scope.sublocationData.sublocation);
        //return false;
      }, function (data) {
        $scope.data.bodySublocations = '';
        $scope.data.bodyConfig = '';
        $scope.data.error = data;
        console.log('error', data);
        return false;
      });
    }
    $scope.sublocationData={
    'bodySublocationSymptoms':''
}
 



}])
.controller('sublocationsCtrl', ['$scope','$state','$http', '$stateParams','LoginService','tokenFactory','apiurls','languageFactory','formatFactory','apiServices','$rootScope','$window','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$http,$stateParams,LoginService,tokenFactory,apiurls,languageFactory,formatFactory,apiServices,$rootScope,$window,$location) {

  $scope.data={
    'bodySublocations':{},
    'bodyConfig':'',
    'error':'',
    'locationId':'',
    'selectorStatus':'',
    'token':''
  }
  //console.log($scope.sublocationId);

    $scope.loadToken=function(){
     LoginService.getToken().then(function(response){

                  $scope.data.token = response;
                  console.log($scope.data.token);
                  loadSublocations();

              });
 }
  
  $scope.data.locationId=$stateParams.locaionId;
  $rootScope.locationId=$scope.data.locaionId;
  //$scope.data.selectorStatus=$rootScope.selectorStatus;

   function loadSublocations(){
     $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
      tokenFactory.storeToken($scope.data.token);
      var url = apiurls.loadBodySublocations+'/'+$stateParams.locaionId;
      console.log($stateParams.locaionId);
      generic_api_call(url, 'bodySublocations','bodySublocationsError','bodySublocationsConfig');
      //console.log($rootScope.sublocationId);
    

}

function generic_api_call(url, scope_variable_name, scope_error_variable_name, scope_config_variable_name)
    {
      var extraArgs = 'token='+tokenFactory.storeToken()+'&language='+languageFactory.storeLanguage()+'&format='+formatFactory.storeFormat()
      url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;
      //$scope.data[scope_variable_name] = "loading data from web service...";
      apiServices.makeRequest({
        URL: url,
        method: 'GET'
            })
      .then(function (data) {
        $scope.data.bodySublocations = data.data != '' ? data.data : 'No results found';
        $scope.data.bodyConfig = data.config;
        $scope.data.error = '';
        //console.log('success', data);
        //$scope.data.bodySublocations
        console.log($scope.data.bodySublocations);
        $scope.sublocationData.sublocation=$scope.data.bodySublocations[0].id
        $rootScope.sublocation=$scope.sublocationData.sublocation;
        $rootScope.sublocationId=$scope.sublocationData.sublocation;
        //console.log($scope.sublocationData.sublocation);
        //return false;
      }, function (data) {
        $scope.data.bodySublocations = '';
        $scope.data.bodyConfig = '';
        $scope.data.error = data;
        console.log('error', data);
        return false;
      });
    }
    $scope.sublocationData={
    'sublocation':''
}

}])
   
.controller('checkDiseaseCtrl', ['$scope','$state','$http', '$stateParams','LoginService','tokenFactory','apiurls','languageFactory','formatFactory','apiServices','$rootScope','$window','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$http,$stateParams,LoginService,tokenFactory,apiurls,languageFactory,formatFactory,apiServices,$rootScope,$window,$location) {
  $scope.data={
    'token':'',
    'genders':[
                {
                  'id':'Male',
                  'label':'Male'
                },
                {
                  'id':'Female',
                  'label':'Female'
                }
            ],
    'SymptomsLocations':[
        {
          'id':'6',
          'label':'Head'
        },
        {
          'id':'15',
          'label':'Chest'
        },
        {
          'id':'7',
          'label':'Arms'
        },
        {
          'id':'10',
          'label':'Legs'
        },
        {
          'id':'16',
          'label':'Hips'
        },
        {
          'id':'17',
          'label':'Skin'
        }
    ],

    'selectorStatus':[
      {
        'id':'Man',
        'label':'Man'
      },
      {
        'id':'Woman',
        'label':'Woman'
      },
      {
        'id':'Boy',
        'label':'Boy'
      },
      {
        'id':'Girl',
        'label':'Girl'
      }
    ],

    'years':'',
    'symptoms':'',
    'languages':[

      {value:"en-gb",name:"en-gb"},{value:"de-ch",name:"de-ch"},{value:"fr-fr",name:"fr-fr"},{value:"es-es",name:"es-es"},{value:"tr-tr",name:"tr-tr"}

    ],
    'formats':[

       {value:"json",name:"json"},{value:"xml",name:"xml"}
    

    ]

  }
 
   var year = new Date().getFullYear();
  //console.log('year'+year);
    var range = [];
    range.push(year);
    for (var i = 1; i < 57; i++) {
        range.push(year - i);
    }
    $scope.data.years = range;

  $scope.selectedData={
    'gender':$scope.data.genders[0].id,
    'symtomsLocation':$scope.data.SymptomsLocations[0].id,
    'selectorStatus':$scope.data.selectorStatus[0].id,
    'yearOfBirth':$scope.data.years[0],
    'lang':$scope.data.languages[0].value,
    'format':$scope.data.formats[0].value

  }

  
    //$rootScope.symptomLocation=$scope.selectedData.symtomsLocation;
    $rootScope.gender=$scope.selectedData.gender;
    $rootScope.yearOfBirth=$scope.selectedData.yearOfBirth;
    $rootScope.selectorStatus=$scope.selectedData.selectorStatus;

    $http.get('http://localhost:90/token_generator.php').then(function(response){
    $scope.data.token=response.data;
    $scope.data.token = $scope.data.token.replace(/^"(.*)"$/, '$1');
    tokenFactory.storeToken($scope.data.token);
    //console.log("Token"+$scope.data.token);
  },function(error){

    console.log("Error",error);
  })

   
   $scope.loadSymptoms=function(){
    
      var url=apiurls.loadSymptoms;
      generic_api_call(url,'symptoms','symptomsError','symptomsConfig');
      console.log('Data'+$scope.data.symptoms);
      //$state.go('menu.checkDisease',{obj: $scope.selectedData.symtomsLocation});
    }

    /*$scope.$watch(
      function watchToken($scope){
        // Return the "result" of the watch expression.
        return($scope.data.token);
      },
      function handleTokenChange( newValue, oldValue ) {
        tokenFactory.storeToken(newValue);
        console.log( "fn($scope.data.token):", newValue );
      }
    );*/
    
    
   function generic_api_call(url, scope_variable_name, scope_error_variable_name, scope_config_variable_name)
    {
      var extraArgs = 'token='+tokenFactory.storeToken()+'&language='+languageFactory.storeLanguage()+'&format='+formatFactory.storeFormat()
      url += url.indexOf("?") > 0 ? "&"+extraArgs : "?"+extraArgs;
      $scope.data[scope_variable_name] = "loading data from web service...";
      apiServices.makeRequest({
        URL: url,
        method: 'GET'
            })
      .then(function (data) {
        $scope.data[scope_variable_name] = data.data != '' ? data.data : 'No results found';
        $scope.data[scope_config_variable_name] = data.config;
        $scope.data[scope_error_variable_name] = '';
        console.log('success', data);
        $scope.data.symptoms=data;
        console.log($scope.data.symptoms);
        return true;
      }, function (data) {
        $scope.data[scope_variable_name] = '';
        $scope.data[scope_config_variable_name] = '';
        $scope.data[scope_error_variable_name] = data;
        console.log('error', data);
        return false;
      });
    }

    //console.log($scope.selectedData.yearOfBirth);

  //console.log('Gender'+$scope.selectedGender.gender);



  
 

  //DataService.data.gender.value=$scope.genders[0].id;

  //console.log('Gender '+DataService.data.gender.value);

  

   /*$scope.imageUrl = null;
  
  // Store the file name after upload to be used for delete
  $scope.filename = null;

  // input file onchange callback
  function imageChanged(fileInput) {

    //read file content
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
       LoginService.upload(file.name, e.currentTarget.result).then(function(res) {
        console.log(res);
        $scope.imageUrl = res.data.url;
        $scope.filename = file.name;
        alert("File Successfully uploaded");
      }, function(err){
        alert(err.data);
      });
    };
   
    reader.readAsDataURL(file);
  };

  // register to change enent on input file 
  function initUpload() {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
      imageChanged(fileInput);
    });
  }
    $scope.initCtrl = function() {
    initUpload();
  }*/

}])
   
.controller('contactCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope','$state','$rootScope','LoginService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$rootScope,LoginService) {
//$route.reload();
   $scope.vm={};
   $scope.userData={};




    //onGetData();

    onUserData();

     $scope.onGetData=function(){ 
        LoginService.getDetail().then(function(response){
            $scope.vm.username=response.firstName||response.data.firstName;
            $scope.vm.email=response.username||response.data.username;
            $scope.vm.type=response.type||response.data.type;

        })
    }

function onUserData(){
    LoginService.getUserData().then(function(response){
        //console.log($scope.vm.email);

        $scope.userData.type=response.type||response.data.type;

        console.log(response.data);
        console.log(response.type);

    })
}


    //onLogin();
    //$scope.email=LoginService.getEmail();
    //$scope.name=LoginService.getUsername();

    //console.log($scope.email);

    /* LoginService.getUsername()
        .then(function(response){
            $scope.vm.username=username||response.data;
             console.log($scope.vm.username);
        })*/


    
    $scope.logout=function(){
        // $state.go('login');
       LoginService.signout()
        .then(function(){
            $rootScope.$broadcast('logout');
            $state.go('login');
            //$scope.vm.username="";


        })
       
    }


}])
   
.controller('loginCtrl', ['$scope','$state','$rootScope','LoginService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$rootScope,LoginService) {


    $scope.vm={
        'email':'',
        'password':'',
        'error':''
    }

    $scope.signin=function(){

        //$state.go('menu.home');

        //onLogin();

        //console.log("singdata"+$scope.vm.email);

        LoginService.signin($scope.vm.email,$scope.vm.password)
        .then(function(){

            //console.log($scope.vm.email);

             onLogin();

        },function(error){
           $scope.vm.error=error.data.error_description;
           console.log($scope.vm.error);
        })
    }

    $scope.anonymousLogin=function(){
        LoginService.anonymousLogin();
        //onLogin('Guest');
    }

    function onLogin(){
        //console.log("Inside onLogin");
        $rootScope.$broadcast('authorized');
        $state.go('menu.home');
        LoginService.getUsername()
        .then(function(response){
            $scope.vm.username=response.username||response.data;
            //$rootScope.username=$scope.vm.username;
            //console.log("Username "+$scope.vm.username);
        })

    }

    $scope.socialSignin=function(provider){

        //console.log('In Social Signin');
        LoginService.socialSignin(provider)
        .then(onValidLogin,onErrorInLogin);

    }

    $scope.socialSignup=function(provider){
        LoginService.socialSignup()
        .then(onValidLogin,onErrorLogin);
    }

    var onValidLogin = function (response) {
        onLogin();
        $scope.vm.username = response.data || $scope.vm.username;
      };

      var onErrorInLogin = function (rejection) {
        $scope.vm.error = rejection.data;
        $rootScope.$broadcast('logout');

      };
      $scope.vm.username = '';
      $scope.vm.error = '';
      $scope.vm.signin = $scope.signin;
      $scope.vm.signout = $scope.signout;
      $scope.vm.anonymousLogin = $scope.anonymousLogin;
      $scope.vm.socialSignup = $scope.socialSignup;
      $scope.vm.socialSignin = $scope.socialSignin;




    
     /*$scope.data = {
        'email': '',
        'password': ''
    }
    
    $scope.error = '';
    
    if ($ionicAuth.isAuthenticated()) {
        // Make sure the user data is going to be loaded
        $ionicUser.load().then(function() {});
        $state.go('menu.home'); 
    }
    
    $scope.login = function(){
        $scope.error = '';
        $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('menu.home');
        }, function(){
            $scope.error = 'Enter your corrent email and password..';
        })
    }
    
    $scope.facebook-function(){
        $scope.error='';
        $ionicAuth.login('facebook').then(function(){
            
            $state.go('menu.home');
            
        },function(){
            $scope.error="Enter your corrent email and password..";
        })
    }*/
    
    
}])
   
.controller('signupCtrl', ['$scope','$state','$rootScope','LoginService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state,$rootScope,LoginService) {


    $scope.vm={
        'firstName':'',
        'lastName':'',
        'email':'',
        'password':'',
        'again':'',
        'error':'',
        'type':'',
        'error_description':''
    }

    $scope.signup=function(){

       // console.log($scope.vm);

        //$state.go('menu.home');

        //onLogin();

        LoginService.signup($scope.vm.firstName, $scope.vm.lastName, $scope.vm.email, $scope.vm.password, $scope.vm.again,parameters={'type':$scope.vm.type})
        .then(function(response){

             onLogin();

        },function(error){
          if (error.data.error_description !== undefined) {
              $scope.vm.error = error.data.error_description;  
            }
            else {
              $scope.vm.error = error.data;
              //alert($scope.vm.error);
            }
        });
    }

    function onLogin() {
        $rootScope.$broadcast('authorized');
        $state.go('menu.home');
      }
     /* $scope.vm.email = '';
      $scope.vm.password = '';
      $scope.vm.again = '';
      $scope.vm.firstName = '';
      $scope.vm.lastName = '';
      $scope.vm.error = '';
    
    /*$scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function(){
        
        $scope.error = '';
        console.log($scope.data);

        $ionicAuth.signup($scope.data).then(function() {
            
            console.log($scope.data);
            // `$ionicUser` is now registered
            $ionicAuth.login('basic', $scope.data).then(function(){
              $state.go('menu.home');
            });
        }, function(err) {
          
            
            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'A user has already signed up with that email',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }    
        
            $scope.error = error_lookup[err.details[0]];
        });
    }*/

}])
 