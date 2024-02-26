mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    center: coordinate,
    zoom: 9
});
const marker = new mapboxgl.Marker()
    .setLngLat(coordinate)
    .addTo(map);