

// Keep drawing line on interval (working!)

jQuery(function () {
    var bingKey = "AlcU70xfhPVbIuGc7yNxMQQa72ZXysBxE5LCcESzTuXVo0E8CCSk8jpDwKv_C4r5"
    // Resize the map according to window size
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    var headerHeight = $("header").height();
    $("#map").css({ "width": docWidth, "height": (docHeight - headerHeight) });
    // Load map
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: bingKey,
                    hidpi: false,
                    culture: 'en-us',
                    imagerySet: 'AerialWithLabels'
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([0, 0]),
            zoom: 2
        })
    });

    // Define two coordinates (longitude, latitude)
    var coordinates = [
        ol.proj.fromLonLat([0, 0]),
        ol.proj.fromLonLat([50, 0]) // Change the coordinates accordingly
    ];

    // New layer
    var vectorSource = new ol.source.Vector();
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 4
            })
        })
    });

    map.addLayer(vectorLayer);

    // Initial coordinates
    var initialCoordinates = ol.proj.fromLonLat([-75.25, -0.07]);

    // Function to add points to the line and update the vector layer
    function addPointToLine() {
        // Create a LineString geometry with all accumulated coordinates
        var accumulatedCoordinates = vectorSource.getFeatures().reduce(function (coordinates, feature) {
            return coordinates.concat(feature.getGeometry().getCoordinates());
        }, [initialCoordinates]);

        // Add a new point to the line
        accumulatedCoordinates.push([accumulatedCoordinates[accumulatedCoordinates.length - 1][0] + 20, accumulatedCoordinates[accumulatedCoordinates.length - 1][1] + 20]);

        // Create a LineString geometry with updated coordinates
        var lineString = new ol.geom.LineString(accumulatedCoordinates);

        // Update the source of the vector layer
        vectorSource.clear(); // Clear existing features
        vectorSource.addFeature(new ol.Feature(lineString));
    }

    // Call addPointToLine every 5 seconds
    setInterval(addPointToLine, 2000);
});