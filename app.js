mapboxgl.accessToken = 'pk.eyJ1IjoicmFtc2F5cmV5bm9sZHMiLCJhIjoiY2w4OWdra29yMDZ5MjN3bXhqczBtZjZ4eiJ9.hk3Lu51KKcfj_kPSZ8bMfg'

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-98.198160,19.043700],
	zoom: 11.5
});

document
.getElementById('listing-group')
.addEventListener('change', function(e)
{
var handler = e.target.id;
if(e.target.checked){
	map[handler].enable();
} else {
	map[handler].disable();
}
});

var customData = {
	'features': [
	{
		'type': 'Feature',
		'properties': {
			'title': 'Tec Campus Puebla'
		},
	'geometry': {
		'coordinates': [-98.241363,19.018283],
		'type': 'Point'
		}
	},
	{
		'type': 'Feature',
		'properties': {
			'title': 'Tec Campus Santa Fe'
		},
	'geometry': {
		'coordinates': [-99.258462,19.359369],
		'type': 'Point'
		}
	},
	{
		'type': 'Feature',
		'properties': {
			'title': 'Tec Campus Estado de México'
		},
	'geometry': {
		'coordinates': [-99.227920,19.594956],
		'type': 'Point'
		}
	}
	],
	'type': 'FeatureCollection'
};
 
function forwardGeocoder(query) {
	var matchingFeatures = [];
	for (var i = 0; i < customData.features.length; i++) {
		var feature = customData.features[i];
		// Handle queries with different capitalization
		// than the source data by calling toLowerCase().
		if (
			feature.properties.title
				.toLowerCase()
				.search(query.toLowerCase()) !== -1
		) {
			feature['place_name'] = '🐏 ' + feature.properties.title;
			feature['center'] = feature.geometry.coordinates;
			feature['place_type'] = ['landmark'];
			matchingFeatures.push(feature);
			}
	}
	return matchingFeatures;
}
 
//Add the control to the map.
map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		localGeocoder: forwardGeocoder,
		zoom: 16,
		placeholder: '¿Qué lugar buscas?',
		mapboxgl: mapboxgl
	})
);