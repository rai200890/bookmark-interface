describe("LoginController", function() {
    var controller = null,
        Auth = null,
        state = null,
        httpBackend = null;
    beforeEach(angular.mock.module('app'));
    describe("#login", function() {
        beforeEach(angular.mock.inject(function($controller, Auth, $state, $httpBackend) {
            httpBackend = $httpBackend;
            state = $state;
            controller = $controller('LoginController', {
                'Auth': Auth,
                '$state': state
            });
        }));
        describe("with valid credentials", function() {
            beforeEach(function() {
                httpBackend.when('POST', 'http://localhost:5000/auth').respond(200, {
                    'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6MSwiaWF0IjoxNDQ0OTE3NjQwLCJuYmYiOjE0NDQ5MTc2NDAsImV4cCI6MTQ0NDkxNzk0MH0.KPmI6WSjRjlpzecPvs3q_T3cJQvAgJvaQAPtk1abC_E'
                });
            });
            it("should go to bookmark list state", function() {
                var credentials = {
                    "username": "user",
                    "password": "pass"
                };
                controller.login(credentials);
                httpBackend.flush();
                expect(state.current.name).toBe('protected.bookmarks');
            });
        });
        describe("with invalid credentials", function() {
            beforeEach(function() {
                httpBackend.when('POST', 'http://localhost:5000/auth').respond(401, {
                    'errors': ['Invalid credentials']
                });
            });
            it("should display error message and not change state", function() {
                var credentials = {
                    "username": "user",
                    "password": "passs"
                };
                controller.login(credentials);
                httpBackend.flush();
                expect(state.current.name).toBe('login');
                expect(controller.errors).toEqual(['Invalid credentials']);
            });
        });
    });
});
