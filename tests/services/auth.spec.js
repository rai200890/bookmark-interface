describe("Auth", function() {
    var service = null,
        httpBackend = null,
        localStorageService = null,
        jwtHelper = null,
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJa9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDQ0OTE3NjQwLCJuYmYiOjE0NDQ5MTc2NDAsImV4cCI6MTQ0NDkxNzk0MH0.KPmI6WSjRjlpzecPvs3q_T3cJQvAgJvaQAPtk1abC_E';
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function(Auth, _User_, _jwtHelper_, $httpBackend, _localStorageService_) {
        httpBackend = $httpBackend;
        service = Auth;
        User = _User_;
        jwtHelper = _jwtHelper_;
        localStorageService = _localStorageService_;
    }));
    describe("#login", function() {
        describe("with valid credentials", function() {
            beforeEach(function() {
                httpBackend.expectPOST('http://localhost:5000/auth').respond(200, {
                    'access_token': token
                });
                spyOn(localStorageService, 'set').and.callThrough();
            });
            it("should store access token in session storage", function() {
                var credentials = {
                    "username": "user",
                    "password": "pass"
                };
                service.login(credentials);
                httpBackend.flush();
                expect(localStorageService.set).toHaveBeenCalledWith('access_token', token);
            });
        });
    });
    describe("#logout", function() {
        beforeEach(function() {
            spyOn(localStorageService, 'remove').and.callThrough();
        });
        it("should remove access token and user id from session storage", function() {
            service.logout();
            expect(localStorageService.remove).toHaveBeenCalledWith('access_token');
        });
    });
    describe("#getCurrentUser", function() {
        beforeEach(function() {
            spyOn(User, 'show').and.callThrough();
            spyOn(service, 'getUserId').and.returnValue(1);
        });
        it("should fetch current user details", function() {
            service.getCurrentUser();
            expect(User.show).toHaveBeenCalledWith(service.getUserId());
        });
    });
    describe('#getToken', function() {
        it("should return token from session storage", function() {
            spyOn(localStorageService, 'get');
            service.getToken();
            expect(localStorageService.get).toHaveBeenCalledWith('access_token', null);
        });
    });
    describe('#getUserId', function() {
        xit("should return user id from session storage", function() {
            spyOn(localStorageService, 'get').and.callThrough();
            service.getUserId();
            expect(localStorageService.get).toBeCalledWith('access_token', null);
        });
    });
    describe('#isTokenValid', function() {
        describe('null token', function() {
            it("should return false", function() {
                spyOn(service, 'getToken').and.returnValue(null);
                expect(service.isTokenValid()).toBe(false);
            });
        });
        describe('expired token', function() {
            it("should return false", function() {
                spyOn(service, 'getToken').and.returnValue(token);
                spyOn(jwtHelper, 'isTokenExpired').and.returnValue(true);
                expect(service.isTokenValid()).toBe(false);
            });
        });
        describe('to be expired token', function() {
            it("should return true", function() {
                spyOn(service, 'getToken').and.returnValue(token);
                spyOn(jwtHelper, 'isTokenExpired').and.returnValue(false);
                expect(service.isTokenValid()).toBe(true);
            });
        });
    });
});
