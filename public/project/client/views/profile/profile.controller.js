"use strict";
(function()
{
    angular
        .module("RecipesComApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, UserService, $routeParams, ApplicationService)
    {
        var vm = this;
        vm.$location = $location;
        vm.user = null;

        vm.isOwnProfile = isOwnProfile;
        vm.isApplicationSubmitted = false;
        vm.update = update;
        vm.applyContribute = applyContribute;


        function init() {
            if (isOwnProfile()) {
                vm.user = $rootScope.user;
                if (vm.user.role == 'R') {
                    ApplicationService
                        .findApplicationByEmail(vm.user.email)
                        .then(function(result) {
                            if (result != null) {
                                vm.isApplicationSubmitted = true;
                            }
                        });
                }
            } else {
                UserService
                    .findUserById($routeParams["id"])
                    .then(function(user) {
                        vm.user = user;
                    });
            }
        }
        init();

        function isOwnProfile() {
            if ($rootScope.user == null || $rootScope.user == undefined) {
                return false;
            } else {
                return ($rootScope.user._id == $routeParams["id"]);
            }
        }

        function update() {
            // Only logged in user can invoke this function
            UserService
                .updateUser($rootScope.user._id, vm.user)
                .then(function(newUser) {
                    vm.user = newUser;
                });
            vm.updateSuccess = "Your profile has been successfully updated!";
        }

        function applyContribute() {
            //jump to another page.
            $location.path("/profile/" + vm.user._id + "/applycontributor")
        }
    }
})();