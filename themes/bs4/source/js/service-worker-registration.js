if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js')
		.then(registration => {
			console.log(`SW registered with the scope of ${registration.scope}`);
		})
		.catch(registrationError => {
			console.error('SW registration failed: ', registrationError.message);
		});
	});
}