hexo generate -f
sw-precache --config sw-config.js
cp service-worker.js public
cp service-worker.js source
hexo deploy



