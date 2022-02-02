![example workflow](https://github.com/dalmatialab/navigation_page/actions/workflows/main.yml/badge.svg)

# Supported tags and respective Dockerfile links
- [1.0-rc-1](https://github.com/dalmatialab/navigation_page/)

# What is Navigation Page?
Navigation page is a front-end web application that simplifies access to other web-sites. It is a similar to a standard browser home page, where you can add links to social media, newspaper or some useful development tools. This website was developed using [Angular 13](https://angular.io/),  a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.

<img src="https://github.com/dalmatialab/navigation_page/" width="200" height="200">

Navigation Page is a quite practical solution in case of having a private network with multiple services and applications. Instead of memorizing IP addresses, ports and domain names, you can easily create handy links to those endpoints.
# Key features 
<img src="https://github.com/dalmatialab/navigation_page/">

In the picture above, You can see an example of user interface of the Navigation page. As I have mentioned, a main purpose of this application is to simplify access to other websites, but there are lots of features that improve usability of the application, and those features include:
 - Adding new tiles
 - Modifying and deleting existing ones
 - Designing tile appearance, that includes tile name, icon, color of the tile (any) and icon (black/white) 
 - Horizontal Drag & Drop
 # How to use this image
 In order to use Angular application in production mode, it has to be deployed with a Web server, in this case **Nginx**. 
 ## Start Navigation Page
 ```
docker run -d -p 8080:80 -v some-host-path/data.json:/usr/share/nginx/html/data.json image:tag
```
Where:
 - *tag* is docker image version
## Ports
Nginx server is running on port 80, you can use whatever port suits You.

## Volumes
Navigation page comes with default *data.json* file, to use Your configuration, mount it to the container:
 ```
-v some-host-path/data.json:/usr/share/nginx/html/data.json
```

# Note
**IMPORTANT !!**
This application is a client-side application, which means that it is rendered on the client, not on the server. Changes like editing, adding, deleting or reordering tiles **will not take effect** after the page is reloaded !

After committing any of the changes mentioned above, "Download Changes" button appears in the Navigation bar. Click on this button will download data.json file with the configuration that represents the last state of the interface. This file can be used as a configuration file, that is mounted into the container as a volume.

