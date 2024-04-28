FROM nginx:latest

COPY ./dist/desirability-gis /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
