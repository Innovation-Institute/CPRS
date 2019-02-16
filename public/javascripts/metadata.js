let app = angular.module('metadataApp', ['selectize']);
app.controller('metaController', function($scope, $http) {
    $scope.singleConfig = {
    //    options: [{value: 1, text: 'Chuck Testa'}, {value: 2, text:'Nikola Tesla'}],
    //    create: true,
        openOnFocus: false, // Illustrate monkeypatch!
        maxItems: 1,
    };
    /**
     * Refresh Values by checking all the rows in all the columns in all the tables.
     *  
     **/
    $scope.refreshValues = () => {
        $http.get(`/${$scope.table}s/meta/update`)
        .then(
            function(response){
                $scope.result="Successfully Refreshed Data";
                $scope.change();
            },
            function(response){
                $scope.result="An Error has occured";
            }
        );
    }
    $scope.addValue = () => {
        let data={
            fieldName: $scope.metaColumn,
            fieldValue: $scope.metadataAdd
        }
        let config = {
            headers : {'Accept' : 'application/json'}
        };
        $http.put(`/${$scope.table}s/meta/add/`,data,config)
        .then(
            function(response){
                $scope.result=response.data;
                $scope.change();
            }, 
            function(response){
                $scope.result=response;
            }
            );

    } 
    $scope.deleteValue = () => {
        $http.delete(`/${$scope.table}s/meta/delete/${$scope.metaColumn}/${$scope.metadataDelete}`)
        .then(
            function(response) {
            $scope.result = response.data;
            console.log($scope.result);
            $scope.change();
            }, 
            function(response){
                $scope.result=response;
            });
    } 
    $scope.change = () => {
        $http.get(`/${$scope.table}s/meta/view/${$scope.metaColumn}`)
        .then(function(response) {
            $scope.currentData = response.data;
        });
    }
});