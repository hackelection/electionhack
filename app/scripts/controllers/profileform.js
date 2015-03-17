'use strict';

/**
 * @ngdoc function
 * @name electionhackApp.controller:ProfileFormCtrl
 * @description
 * # ProfileFormCtrl
 * Controller of the electionhackApp
 */
angular.module('electionhackApp')
  .controller('ProfileFormCtrl', function ($scope, $http) {
    
    var step = 0;

    $scope.profile = {};
    $scope.validation = {
        errors: false
    };
    $scope.not_done = true;

    // Sorry for the hack
    // Each stage represents a step in the wizard
    $scope.stages = [
        {
            name: 'Basic info',
            open: true,
            complete: false,
            fields: ['firstName', 'otherNames', 'lastName', 'dob_d', 'dob_m', 'dob_y']
        },
        {
            name: 'Constituency info',
            open: false,
            complete: false,
            fields: ['constituency']
        },
        {
            name: 'Contact info',
            open: false,
            complete: false,
            fields: ['addr_first', 'addr_second', 'addr_city', 'addr_pc']
        },
        {
            name: 'Submit',
            open: false,
            complete: true
        }
    ];

    // Validates every step in a stage using the per-field validation below
    var validateStep = function (step, profile) {
        var fields = $scope.stages[step].fields;
        for (var i = 0; i < fields.length; i++) {
            if (!validateField(fields[i], profile[fields[i]])) {
                return false;
            }
        }
        return true;
    };

    // Takes a fieldname and the value of that field currently in the form
    // and validates that particular field
    var validateField = function (fieldName, formField) {
        if (fieldName === undefined || formField === undefined) {
            return false;
        }

        // TODO: per-field validation

        return true;
    };

    // Validates the fields that belong to the current step and
    // then marks as complete before opening the next step
    $scope.advance = function (profile) {
        if (validateStep(step, profile)) {
            $scope.validation.errors = false;
            $scope.stages[step].open = false;
            $scope.stages[step].complete = true;
            step += 1;
            if (step > 2)
            {
                not_done = false;
            }
            $scope.stages[step].open = true;
        } else {
            // show errors
            $scope.validation.errors = true;

            // DEBUG
            console.log('You did not fill in the form correctly!');
        }
    };

    // Validates the fields that belong to the current step and
    // then marks as complete before opening the next step
    $scope.back = function () {
        $scope.validation.errors = false;
        $scope.stages[step].open = false;
        if (step > 0) {
            step -= 1;
        }
        
        $scope.stages[step].open = true;
    };
    
    $scope.submit = function() {
        alert("form sent");
        $http.get("http://electionformfiller.herokuapp.com/", {
            params: { addr_city: "blah", addr_first: "blah", addr_second: "test", firstname: "test2", 
                     DoB_d: "10",
            DoB_m: "10",
            DoB_y: "1000",
            commonforename: "blah",
            commonsurname: "blah",
            othernames: "blah",
            surname: "blah",
            addr_postcode: "blah",
            constituency: $scope.profile.constituency,
            email: "phil.efstat@gmail.com" 
            }
        }).
          success(function(data, status, headers, config) {
            alert("check your email soon for the pdf");
            
          }).
          error(function(data, status, headers, config) {
            alert("something went wrong");
          });
    }
  });
