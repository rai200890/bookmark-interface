describe("LoginController", function() {
  var controller = null,
    Auth = null,
    state = null,
    $rootScope = null,
    localStorageService = null,
    httpBackend = null,
    PermRoleStore = null;
  beforeEach(angular.mock.module('app'));
  describe("#login", function() {
    beforeEach(angular.mock.inject(function($controller, Auth, $state, $httpBackend, _$rootScope_, _localStorageService_, _PermRoleStore_) {
      httpBackend = $httpBackend;
      state = $state;
      PermRoleStore = _PermRoleStore_;
      $rootScope = _$rootScope_;
      localStorageService = _localStorageService_;
      controller = $controller('LoginController', {
        'Auth': Auth,
        '$state': state,
        '$scope': $rootScope.$new(),
        'localStorageService': localStorageService
      });
    }));
    describe("with valid credentials", function() {
      beforeEach(function() {
        httpBackend.when('POST', 'http://localhost:5000/auth').respond(200, {
          'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDQ0OTE3NjQwLCJuYmYiOjE0NDQ5MTc2NDAsImV4cCI6MTQ0NDkxNzk0MH0.KPmI6WSjRjlpzecPvs3q_T3cJQvAgJvaQAPtk1abC_E'
        });
        httpBackend.when('GET',  'http://localhost:5000/users/1').respond(200, {
          'user': {
            "id": 1,
            "name": "client",
            "role_name": "client"
          }
        });
        spyOn(state, "go").and.callThrough();
      });
      it("should go to bookmark list state", function() {
        var credentials = {
          "username": "user",
          "password": "pass"
        };
        controller.login(credentials);
        localStorageService.set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDQ0OTE3NjQwLCJuYmYiOjE0NDQ5MTc2NDAsImV4cCI6MTQ0NDkxNzk0MH0.KPmI6WSjRjlpzecPvs3q_T3cJQvAgJvaQAPtk1abC_E');
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith('protected.bookmark_list');
      });
    });
    describe("with invalid credentials", function() {
      beforeEach(function() {
        httpBackend.when('POST', 'http://localhost:5000/auth').respond(401, {
          'errors': ['Invalid credentials']
        });
        httpBackend.when('GET',  'http://localhost:5000/users/1').respond(401, {});
      });
      it("should display error message and not change state", function() {
        var credentials = {
          "username": "user",
          "password": "passs"
        };
        controller.login(credentials);
        httpBackend.flush();
        expect(controller.alerts[0].messages).toEqual(['Invalid credentials']);
      });
    });
  });
});
