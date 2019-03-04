#!/usr/bin/bash

echo Deploying...
npm run build
tar -czf dist.tar.gz dist
scp -P 1234 dist.tar.gz przemek@vps654600.ovh.net:www/bielak.me
rm dist.tar.gz