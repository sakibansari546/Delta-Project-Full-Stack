mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    zoom: 10
});
const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);