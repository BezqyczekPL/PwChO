FROM node AS build1
RUN mkdir -p /var/node
WORKDIR /var/node
ADD src ./

FROM node:alpine
COPY --from=build1 /var/node /var/node
WORKDIR /var/node
EXPOSE 1999
CMD [ "node", "serwer.js" ]