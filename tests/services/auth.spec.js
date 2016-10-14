describe("Auth", function() {
    var service = null,
        httpBackend = null,
        localStorageService = null,
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJa9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDQ0OTE3NjQwLCJuYmYiOjE0NDQ5MTc2NDAsImV4cCI6MTQ0NDkxNzk0MH0.KPmI6WSjRjlpzecPvs3q_T3cJQvAgJvaQAPtk1abC_E';
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function(Auth, $httpBackend, _localStorageService_) {
        httpBackend = $httpBackend;
        service = Auth;
        localStorageService = _localStorageService_;
    }));
    describe("#login", function() {
        describe("with valid credentials", function() {
            beforeEach(function() {
                httpBackend.expectPOST('http://localhost:5000/auth').respond(200, {
                    'access_token': token
                });
                spyOn(localStorageService, 'set');
            });
            it("should store access token in session storage", function() {
                var credentials = {
                    "username": "user",
                    "password": "pass"
                };
                service.login(credentials);
                httpBackend.flush();
                expect(localStorageService.set).toHaveBeenCalledWith('access_token', token);
                expect(localStorageService.set).toHaveBeenCalledWith('user_id', 1);
            });
        });
    });
    describe('#getToken', function() {
      it("should return token from session storage", function(){
        spyOn(localStorageService, 'get');
        service.getToken();
        expect(localStorageService.get).toHaveBeenCalledWith('access_token', null);
      });
    });
});
