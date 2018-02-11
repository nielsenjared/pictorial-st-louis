/* global L */
;(function (window) {
  var imageContainerMargin = 50;  // Margin + padding

// This watches for the scrollable container
  var scrollPosition = 0;

  $('div#contents').scroll(function() {
    scrollPosition = $(this).scrollTop();
  });

  function init (mapid) {
    var minZoom = 2
    var maxZoom = 7
    var img = [
      64000,
      20275
    ]

    // create the map
    var map = L.map(mapid, {
      //added from storymap
      //center: [0, 0],
      //zoom: 5,
      //scrollWheelZoom: false,
      //
      minZoom: minZoom,
      maxZoom: maxZoom
    })

    // assign map and image dimensions
    var rc = new L.RasterCoords(map, img)

    // set the view on a marker ...
    //map.setView(rc.unproject([4900, 3015]), 3)
/*
    // add layer control object
    L.control.layers({}, {
      //'Polygon': layerPolygon(map, rc),
      //'Points of Interest': layerCountries(map, rc),
      'Bounds': layerBounds(map, rc, img),
      //'Info': layerGeo(map, rc)
    }).addTo(map)
*/
    // the tile layer containing the image generated with gdal2tiles --leaflet ...
    L.tileLayer('./tiles/{z}/{x}/{y}.png', {
      noWrap: true,
      attribution: '<a href="<https://www.loc.gov/resource/g3200.mf000070/>"Library of Congress</a>'
    }).addTo(map)

  $.getJSON('map.geojson', function(data) {
  var geojson = L.geoJson(data, {
    // correctly map the geojson coordinates on the image
    coordsToLatLng: function (coords) {
        return rc.unproject(coords)
      },
    onEachFeature: function (feature, layer) {
      (function(layer, properties) {
        // This creates numerical icons to match the ID numbers
        // OR remove the next 6 lines for default blue Leaflet markers
        var numericMarker = L.ExtraMarkers.icon({
          icon: 'fa-number',
          number: feature.properties['id'],
          markerColor: 'blue'
        });
        layer.setIcon(numericMarker);

        // This creates the contents of each chapter from the GeoJSON data. Unwanted items can be removed, and new ones can be added
        var chapter = $('<p></p>', {
          text: feature.properties['chapter'],
          class: 'chapter-header'
        });

        var image = $('<img>', {
          src: feature.properties['image'],
        });

        var source = $('<a>', {
          text: feature.properties['source-credit'],
          href: feature.properties['source-link'],
          target: "_blank",
          class: 'source'
        });

        var description = $('<p></p>', {
          text: feature.properties['description'],
          class: 'description'
        });

        var container = $('<div></div>', {
          id: 'container' + feature.properties['id'],
          class: 'image-container'
        });

        var imgHolder = $('<div></div', {
          class: 'img-holder'
        });

        imgHolder.append(image);

        container.append(chapter).append(imgHolder).append(source).append(description);
        $('#contents').append(container);

        var i;
        var areaTop = -100;
        var areaBottom = 0;

        // Calculating total height of blocks above active
        for (i = 1; i < feature.properties['id']; i++) {
          areaTop += $('div#container' + i).height() + imageContainerMargin;
        }

        areaBottom = areaTop + $('div#container' + feature.properties['id']).height();

        $('div#contents').scroll(function() {
          if ($(this).scrollTop() >= areaTop && $(this).scrollTop() < areaBottom) {
            $('.image-container').removeClass("inFocus").addClass("outFocus");
            $('div#container' + feature.properties['id']).addClass("inFocus").removeClass("outFocus");

            map.flyTo(
              rc.unproject(feature.geometry.coordinates),
              feature.properties['zoom']
            );
            //map.flyTo([feature.geometry.coordinates[1], feature.geometry.coordinates[0] ], feature.properties['zoom']);
          }
        });

        // Make markers clickable
        layer.on('click', function() {
          $("div#contents").animate({scrollTop: areaTop + "px"});
        });

      })(layer, feature.properties);
    }
  });

  $('div#container1').addClass("inFocus");
  $('#contents').append("<div class='space-at-the-bottom'><a href='#space-at-the-top'><i class='fa fa-chevron-up'></i></br><small>Top</small></a></div>");
  map.fitBounds(geojson.getBounds());
  geojson.addTo(map);
});
}
  init('map')
}(window))
