var utils = require('../utils');


function Planet (name, life, age, radius, rotates, density) {
    this.name = name;
    this.life = life;           //行星寿命
    this.age = age;             //行星年龄
    this.radius = radius;       //行星半径
    this.area = utils.sphereArea(this.radius);//行星表面积
    this.rotates = rotates;     //自转速度
    this.density = density;     //行星密度
    this.volume = utils.sphereVolume(this.radius);
    //行星质量由半径和密度求出，星球看作理想球体
    this.mass =  this.volume * this.density;
    this.g = utils.G * this.mass / ( this.radius  * this.radius);

    this.population = 1;
    this.satellite = [];
    this.cities = [];
    this.researchAccumulation = 0;

    this.addCity = function (city) {
        this.cities.push(city);
    };

    this.nextTick = function (tickStep) {
        for (var i = 0; i < this.cities.length; i++) {
            this.cities[i].nextTick(tickStep);
            this.researchAccumulation += this.cities[i].research * tickStep;
        };
    };
}

module.exports = Planet;