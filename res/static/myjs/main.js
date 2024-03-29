jQuery(function () {
    var bingKey = "AlcU70xfhPVbIuGc7yNxMQQa72ZXysBxE5LCcESzTuXVo0E8CCSk8jpDwKv_C4r5"
    // Resize the map according to window size
    var docWidth = $(document).width();
    var docHeight = $(document).height();
    var headerHeight = $("header").height();
    var colWidth = $("#firstCol").width();
    $("#map").width(docWidth - colWidth).height(docHeight -headerHeight);
    // $("#map").css({ "height": (), "width": () });
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

    // Create a vector layer for the satellite path
    var pathVectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
    });

    // Create a vector layer for the SVG icon
    var iconVectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: ic_url,
                anchor: [0.5, 1] // Set the anchor point of the icon
            })
        })
    });

    map.addLayer(pathVectorLayer);
    map.addLayer(iconVectorLayer);

    // drawsatellite
    function drawSatellitePath() {
        $.ajax({
            // url: 'http://127.0.0.1:5000/cord',
            url: 'http://127.0.0.1:5000/satdata',
            type: 'GET',
            success: function (data) {
                // Extract coordinates from the response data
                var latitude = data['lat_end'];
                var longitude = data['long_end'];
                var ra = data['ra']
                var dec = data['dec']
                // Change view details
                $("#s_id").html(data['id']);
                $("#s_name").html(data['name']);
                $("#s_alt").html(data['alt']);
                $("#s_lat").html((Math.round(latitude * 100) / 100).toFixed(2));
                $("#s_long").html((Math.round(longitude * 100) / 100).toFixed(2));
                $("#s_ra").html((Math.round(ra * 100) / 100).toFixed(2));
                $("#s_dec").html((Math.round(dec * 100) / 100).toFixed(2));

                // Get the current coordinate
                var currentCoordinate = ol.proj.fromLonLat([longitude, latitude]);

                // Update the source of the path vector layer
                var pathSource = pathVectorLayer.getSource();
                var pathFeatures = pathSource.getFeatures();

                if (pathFeatures.length > 0) {
                    // Get the existing LineString geometry
                    var pathGeometry = pathFeatures[0].getGeometry();

                    // Add the new coordinate to the LineString
                    pathGeometry.appendCoordinate(currentCoordinate);
                } else {
                    // Create a new LineString geometry with the current coordinate
                    var pathGeometry = new ol.geom.LineString([currentCoordinate]);

                    // Add a feature with the LineString geometry to the path vector layer
                    pathVectorLayer.getSource().addFeature(new ol.Feature({
                        geometry: pathGeometry
                    }));
                }

                // Update the source of the icon vector layer
                iconVectorLayer.getSource().clear();
                iconVectorLayer.getSource().addFeature(new ol.Feature({
                    geometry: new ol.geom.Point(currentCoordinate)
                }));

                // Pan the map to the latest coordinate
                map.getView().animate({ center: currentCoordinate, duration: 500 });

                // Call drawSatellitePath again after 10 seconds
                setTimeout(drawSatellitePath,5000);
            },
            error: function (error) {
                console.error('Error fetching satellite position data:', error);

                // Call drawSatellitePath again after 10 seconds
                setTimeout(drawSatellitePath, 10000);
            }
        });
    }

    // Initial call to start drawing the satellite path
    drawSatellitePath();
});