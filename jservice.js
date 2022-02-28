var request = require("request");
var swapiApi = request.defaults({
	baseUrl: "https://swapi.dev/api/"
});

module.exports = {
	getData: function(id, cb) {
		swapiApi.get(`/planets/3/`, function(error, response, body) {
			var newData = JSON.parse(body);
			cb(newData);
		});
	}
}