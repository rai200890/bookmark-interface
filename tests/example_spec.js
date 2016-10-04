//var angular_mocks = require('angular-mocks/angular-mocks');
var app = '../app/index.js';
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    angular.mock.module(app);
    expect(true).toBe(true);
  });
});
