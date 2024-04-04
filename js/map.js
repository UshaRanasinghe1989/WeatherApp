//const key = 'QAunfjsbfUA1AbRWAGEE';

const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.TileJSON({
        //url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`,
        url: `https://api.maptiler.com/maps/basic-v2/tiles.json?key=QAunfjsbfUA1AbRWAGEE`,
        tileSize: 512,
        crossOrigin: 'anonymous'
      })
    })
  ],
  target: 'map',
  view: new ol.View({
    constrainResolution: true,
    center: ol.proj.fromLonLat([16.62662018, 49.2125578]),
    zoom: 5
  })
});