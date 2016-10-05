describe("A suite", function() {
  var controller = null;
  beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = function() {
        return $controller('LoginController', {
          'Auth': {"login": function(){}},
          '$state': {"go": function(){}}
        });
      };
    }));
  it("contains spec with an expectation", function() {
     expect(controller()).toBe(true);
    // var controller = $controller('LoginController',{Auth: {}, $state: {}});
    // expect(controller).toBe(true);
  });
});
