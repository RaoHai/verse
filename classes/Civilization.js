
var utils = require('../utils');

var Civilization = function (name, parentPlanet) {
    this.name = name;
    this.parentPlanet = parentPlanet;
    this.researchAccumulation = 0;

    this.nextTick = function (tickStep) {
        this.parentPlanet.nextTick(tickStep);
        this.researchAccumulation += this.parentPlanet.researchAccumulation;
    };
};

module.exports = Civilization;