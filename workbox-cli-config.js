module.exports = {
	globDirectory: "./public/",
	globPatterns: ["**/*.html", "**/*.js", "**/*.css", "**/*.png", "**/*.webp"],
	swDest: "public/sw.js",
	clientsClaim: true,
	skipWaiting: true,
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/use\.fontawesome\.com\/releases/,
			handler: "networkFirst"
		},
		{
			urlPattern: /^https:\/\/fonts\.gstatic\.com\/s\//,
			handler: "networkFirst"
		},
		{
			urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap/,
			handler: "networkFirst"
		},
		{
			urlPattern: /^https:\/\/fonts\.googleapis\.com/,
			handler: "networkFirst"
		},
		{
			urlPattern: /^https:\/\/code\.jquery\.com\/jquery-3/,
			handler: "networkFirst"
		},
	]
};
