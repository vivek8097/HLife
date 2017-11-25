angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope','$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {       


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
   
.controller('searchDiseaseCtrl', ['$scope', '$stateParams','LoginService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,LoginService) {




}])
   
.controller('checkDiseaseCtrl', ['$scope','$http', '$stateParams','LoginService','tokenFactory','apiurls','languageFactory','formatFactory','apiServices', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$http,$stateParams,LoginService,tokenFactory,apiurls,languageFactory,formatFactory,apiServices) {

  

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

  $http.get('http://localhost:90/token_generator.php').then(function(response){
    $scope.data.token=response.data;
    //console.log("Token"+$scope.data.token);
  },function(error){

    console.log("Error",error);
  })

   
   

   //console.log('Symtoms'+$scope.data.symptoms);

    function loadSymptoms(){
      var url=apiurls.loadSymptoms;
      generic_api_call(url,'symptoms','symptomsError','symptomsConfig');
    }

    $scope.$watch(
      function watchToken($scope){
        // Return the "result" of the watch expression.
        return($scope.data.token);
      },
      function handleTokenChange( newValue, oldValue ) {
        tokenFactory.storeToken(newValue);
        console.log( "fn($scope.data.token):", newValue );
      }
    );
    loadSymptoms();
    
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

   $scope.vm={};
   $scope.userData={};




    onGetData();

    onUserData();

    function onGetData(){
          //$rootScope.$broadcast('authorized');
        LoginService.getDetail().then(function(response){
            $scope.vm.username=response.firstName||response.data.firstName;
            $scope.vm.email=response.username||response.data.username;
            $scope.vm.type=response.type||response.data.type;
            //console.log($scope.vm);
           // $scope.vm.username=response.data.firstName;
            //$scope.vm.email=response.data.username;
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
           $scope.vm.error=error;
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
            console.log("Username "+$scope.vm.username);
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
        'type':''
    }

    $scope.signup=function(){

       // console.log($scope.vm);

        //$state.go('menu.home');

        //onLogin();

        LoginService.signup($scope.vm.firstName, $scope.vm.lastName, $scope.vm.email, $scope.vm.password, $scope.vm.again,parameters={'type':$scope.vm.type})
        .then(function(){

             onLogin();

        },function(error){
          if (reason.data.error_description !== undefined) {
              $scope.vm.error = reason.data.error_description;  
            }
            else {
              $scope.vm.error = reason.data;
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
 