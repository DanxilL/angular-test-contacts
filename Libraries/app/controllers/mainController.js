/**
 * Created by DanxilL on 08.05.2017.
 */

//Модуль приложения
var contactApp = angular.module('contactApp', []);

//Контроллер
contactApp.controller('mainCtrl', ['$scope','$http',function ($scope,$http) {
        $http.get('api.php?read=true').then(function (response) {
            $scope.contacts = response.data;
        });
    /**
     * Methods & functional
     * ===============================================================================================================
     */



    //Add contact
    $scope.addNewContact = function () {
        if($scope.contacts.length  < 1)
        {
            $scope.contacts = [];
        }
        $scope.contacts.push({
            'name':$scope.newcontact.name,
            'lastname':$scope.newcontact.lastname,
            'address':$scope.newcontact.address,
            'telephone':$scope.newcontact.telephone
        });
        $scope.saveIDB('/api.php?put=true',$scope.contacts);
        $scope.newcontact.name='';
        $scope.newcontact.lastname='';
        $scope.newcontact.address='';
        $scope.newcontact.telephone='';

        };

    //Show add contact form
    $scope.showForm = function () {
        if($scope.addContactVisible == true)
        {
            $scope.addContactVisible = false;
        }
        else
        {
            $scope.addContactVisible = true;
        }
    };

    //SAVE IN DATABASE
    $scope.saveIDB = function (url,data) {
        $http.post(url,data).then(function (response) {
            var data = response.data;
            var status = response.status;
            var statusText = response.statusText;
            var headers = response.headers;
            var config = response.config;
            console.log(data);
        });
    }


    //DELETE FROM DATABASE

    $scope.deleteFromDB = function (obj) {
        $scope.contacts.splice(obj.$index,1);
        $scope.saveIDB('/api.php?put=true',$scope.contacts);
    };



    //EDIT CONTACT
    $scope.doEditContact = function (obj) {
        $scope.lastEditIndex = obj.$index;
        $scope.editcontact = $scope.contacts[obj.$index];
        $scope.doEdit = true;
        $scope.addContactVisible = false;
    }


    $scope.doSave = function () {
        $scope.contacts[$scope.lastEditIndex] = $scope.editcontact;
        $scope.saveIDB('/api.php?put=true',$scope.contacts);
        $scope.doEdit = false;
    }

    /**
     * Params and configs
     * ================================================================================================================
     */


    $scope.addContactVisible = false;
    $scope.doEdit            = false;

    $scope.lastEditIndex = 0;
}]);