;(function (window) {
  // geoJson definitions for country
  window.countries = [{
    type: 'Feature',
    properties: {
      name: 'Eads Bridge'
      //"website": "https://www.loc.gov/resource/g4164sm.gpm00001/?sp=97"
    },
    geometry: {
      type: 'Point',
      coordinates: [46100, 16500]
    }
  }]

  // geoJson definitions
  window.geoInfo = [{
    'type': 'Feature',
    'properties': {
      'name': 'Mare Maggiore'
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [2623, 1918]
    }
  }]

  // polygon
  window.polygon = [{
    x: 1528.5,
    y: 1524
  }, {
    x: 1528.5,
    y: 1524
  }]
}(window))
