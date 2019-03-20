## My personal website

## Motivation
Website is a portfolio of all my projects, contact info. Was created using vue and is hosted on a private server using nginx.

## Website link
[bielak.me](https://bielak.me/)  
[bielak.me/projects](https://bielak.me/projects/)
 
## Screenshots
![Alt Text](https://i.imgur.com/atRYCTd.gif)

## Tech/framework used

<b>Built with</b>
- [Vue](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Nginx](https://www.nginx.com/)
- [Express.js](https://expressjs.com/)
- [PM2](http://pm2.keymetrics.io/)
- [Github API](https://developer.github.com/v3/)

## Features
Website is hosted by Express.js server on a private server.  
Nginx is used as a reversed proxy to the website.  
Express script is scheduled to run by PM2 on a server start.  
SSL certificate was granted using LetsEncrypt.  
All non-SSL requests are routed to SSL website.  

Website supports mobile and desktop layouts.  
Website is using Github API to automatically embed my current commit link to the website under "pushed last commit to" and to list all of my projects and used languages.

## Installation
Deployment build: 
```bash
npm run build  
```
Start server:  
```bash
node server.js
```


## License
MIT © [Przemysław Bielak]()