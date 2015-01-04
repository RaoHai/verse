
var utils = require('../utils'),
    Buildings =require('./Buildings');

var City = function (name, population, gold, food , capacity, research, culture, faith , happy ) {
    //1单位的人口消耗1单位的food，1单位的gold和1单位的happy。
    this.name = name;
    this.population = population || 1;//人口
    this.gold = gold || 5;
    this.goldaccu = 0;
    this.goldcost = 0;
    this.food = food || 2;  //食物增长
    this._foodStep = 10;    //人口增长线
    this._food = 0;         //积累的食物

    this.capacity = capacity || 10;
    this._capacity = 0;
    this.research = research || 1;
    this.culture = culture || 1;
    this.faith = faith || 1;
    this.happy = happy || 5;
    this.unhappy = 0;

    this.buildings = [];
    this.onBuild = null;
    this.onBuildName = null;

    this.nextTick = function (tickStep) {
        
        while(tickStep--) {
            //计算食物积累
            this._food += this.food - this.population;
            if (this._food >= this._foodStep) {
                this.population ++;
                this._food = this._food - this._foodStep;
                this._foodStep = Math.floor(this._foodStep * 1.2);
                console.log(' 城市[' + this.name + ']的人口增长到 ' + this.population);
            }
            console.log(' 城市[' + this.name + ']的人口: ' + this._food + ' / ' + this._foodStep);


            //计算产能积累
            this._capacity += this.capacity;
            //需求科技, 消耗, 维护费, 金钱,  食物, 产能, 科研, 文化, 信仰,  快乐
            if ( this.onBuild && this._capacity >= this.onBuild[1]) {
                this._capacity = this._capacity - this.onBuild[1];
                this.buildings.push(this.onBuild);
                this.gold  = this.gold + this.onBuild[3] - this.onBuild[2];
                this.food += this.onBuild[4];
                this.capacity += this.onBuild[5];
                this.research += this.onBuild[6];
                this.culture += this.onBuild[7];
                this.faith += this.onBuild[8];
                this.happy += this.onBuild[9];
                console.log(' 城市[' + this.name + '] 的建筑 [' + this.onBuildName + '] 修建完成');
                this.onBuild = null;
                this.onBuildName = null;

            };
        }

        

    };

    this.build = function (buildingName) {
        var onBuild = Buildings[buildingName];
        if (onBuild) {
            this.onBuildName = buildingName;
            this.onBuild = onBuild;
        }
    };
};

module.exports = City;