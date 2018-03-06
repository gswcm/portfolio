hexo generate -f
sw-precache --config sw-config.js
mv service-worker.js public
hexo deploy



