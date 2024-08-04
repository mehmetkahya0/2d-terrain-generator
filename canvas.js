function generateTerrain() {
    var canvas = document.getElementById("terrain");
    var ctx = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;

    var seaLevel = 0.3;
    var beachLevel = 0.35;
    var grassLevel = 0.5;
    var forestLevel = 0.7;
    var mountainLevel = 0.8;
    var snowLevel = 0.9;
    var cityLevel = 0.6;

    var baseNoiseScale = parseFloat(document.getElementById("baseNoiseScale").value);
    var detailNoiseScale = parseFloat(document.getElementById("detailNoiseScale").value);
    var noise = new SimplexNoise();

    var terrain = [];
    for (var x = 0; x < width; x++) {
        terrain[x] = [];
        for (var y = 0; y < height; y++) {
            var nx = x / width - 0.5;
            var ny = y / height - 0.5;
            var baseElevation = (noise.noise2D(baseNoiseScale * nx, baseNoiseScale * ny) + 1) / 2;
            var detailElevation = (noise.noise2D(detailNoiseScale * nx, detailNoiseScale * ny) + 1) / 2;
            var elevation = (baseElevation + detailElevation) / 2;
            terrain[x][y] = elevation;
        }
    }

    var getColor = function (elevation) {
        if (elevation < seaLevel) {
            return "blue"; // Sea
        } else if (elevation < beachLevel) {
            return "yellow"; // Beach
        } else if (elevation < grassLevel) {
            return "green"; // Grass
        } else if (elevation < forestLevel) {
            return "darkgreen"; // Forest
        } else if (elevation < mountainLevel) {
            return "gray"; // Mountain
        } else if (elevation < snowLevel) {
            return "lightgray"; // Snow
        } else if (elevation < cityLevel) {
            return "black"; // City
        } else {
            return "white"; // Snow
        }
    };

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            ctx.fillStyle = getColor(terrain[x][y]);
            ctx.fillRect(x, y, 1, 1);
        }
    }

    // Draw a border around the canvas
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
}

document.getElementById("baseNoiseScale").addEventListener("input", function() {
    document.getElementById("baseNoiseScaleValue").textContent = this.value;
});

document.getElementById("detailNoiseScale").addEventListener("input", function() {
    document.getElementById("detailNoiseScaleValue").textContent = this.value;
});

var button = document.getElementById("generate");
button.addEventListener("click", generateTerrain);
generateTerrain(); // Initial call to generate the terrain