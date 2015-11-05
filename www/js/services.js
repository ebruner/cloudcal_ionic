angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('PetService', function($http) {

  return {
    all: function() {
      return pets;
    },
    get: function(index) {
      // Simple index lookup
      return pets[index];
    },
    getAll: function() {
      return pets;
    },
     set: function(petsArray) {
      pets = petsArray;
    }
  }
});

