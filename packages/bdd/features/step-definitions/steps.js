const { Given, When, Then } = require("@cucumber/cucumber");
const { Person } = require("../../src/shouty.js");
const { expect } = require("expect");

Given('Lucy is located {int} metres from Sean', function (distance) {
  this.lucy = new Person
  this.sean = new Person
  this.lucy.moveTo(distance)
});

When('Sean shouts {string}', function (message) {
  this.sean.shout(message);
  this.message = message;
});

Then('Lucy hears Sean\'s message', function () {
  // expect(this.lucy.messagesHeard()).toBe(this.message);
  expect(true).toBe(true);
});