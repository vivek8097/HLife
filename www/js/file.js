var myApp = angular.module('app', ['backand']);

// Backand security configuration for your app
myApp.config(function(BackandProvider) {
  // enter your app name here
  BackandProvider.setAppName('hlife');
  // enter your app anonymous token here
  BackandProvider.setAnonymousToken('c2220ab6-a1ee-42b3-a3b1-a9bf6198951c');
})

myApp.controller('DemoCtrl', ['$scope', 'Backand', DemoCtrl]);

function DemoCtrl($scope, Backand) {

  // Create a server side action in backand
  // Go to any object's actions tab 
  // and click on the Backand Storage icon.
  // Backand consts:
  var objectName = 'users';
  var filesActionName = 'files';
  
  // Display the image after upload
  $scope.imageUrl = null;
  
  // Store the file name after upload to be used for delete
  $scope.filename = null;

  // input file onchange callback
  function imageChanged(fileInput) {

    //read file content
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      upload(file.name, e.currentTarget.result).then(function(res) {
        console.log(res);
        $scope.imageUrl = res.data.url;
        $scope.filename = file.name;
        alert("File Successfully updated");
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

   // call to Backand action with the file name and file data  
  function upload(filename, filedata) {
    // By calling the files action with POST method in will perform 
    // an upload of the file into Backand Storage
    var data = filedata.substr(filedata.indexOf(',') + 1, filedata.length);
    return backand.file.upload(objectName, filesActionName, filename, data);   
  };

  $scope.deleteFile = function(){
    if (!$scope.filename){
      alert('Please choose a file');
      return;
    }
    // By calling the files action with DELETE method in will perform 
    // a deletion of the file from Backand Storage
    return backand.file.remove(objectName, filesActionName, $scope.filename).then(function(res){
      // Reset the form
      console.log(res);
      $scope.imageUrl = null;
      document.getElementById('fileInput').value = "";
    });
  }
  
  $scope.initCtrl = function() {
    initUpload();
  }
}