module.exports = {
	staticFileGlobs: [
		'public/css/**.css',
		'public/**/**.html',
		'public/**/**.png',
		'public/js/**.js'
	],
	stripPrefix: 'public',
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/use\.fontawesome\.com\/releases/,
			handler: 'cacheFirst'
		},
		{
			urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap/,
			handler: 'cacheFirst'
		},
		{
			urlPattern: /^https:\/\/fonts\.googleapis\.com/,
			handler: 'cacheFirst'
		},
		{
			urlPattern: /^https:\/\/code\.jquery\.com\/jquery-3/,
			handler: 'cacheFirst'
		},
	]
}