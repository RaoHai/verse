var Verse = function () {
    this.Civilizations = []


    this.addCivilization = function (civil) {
        this.Civilizations.push(civil);
    };

    this.nextTick = function (tickStep) {
        for (var i = 0; i < this.Civilizations.length; i++) {
            this.Civilizations[i].nextTick(tickStep);
        };
    };
};


module.exports =  {
    _verse : new Verse(),
    getVerse : function () {
        return this._verse;
    } 
};