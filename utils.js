var G = 6.672e-11;

var sphereVolume = function (radius) {
    return 4/3 * Math.PI * Math.pow(radius, 3);
};

var sphereArea = function (radius) {
    return 4 * Math.PI * radius * radius;
};


module.exports = {
    sphereVolume: sphereVolume,
    sphereArea : sphereArea,
    G : G,
};