#wybor obrazu bazowego (node)
FROM node AS build1
#autor dockerfile'a
LABEL author="Dawid Nicpon"
#utworz katalog /var/node
RUN mkdir -p /var/node
#ustaw go jako przestrzen robocza
WORKDIR /var/node
#dodaj do projektu katalog src
ADD src ./

#wybor obrazu oparty na alpine
FROM node:alpine
#skopiuj pliki z pierwszego builda do odpowiadajacego katalogu
COPY --from=build1 /var/node /var/node
#ustaw go jako przestrzen robocza
WORKDIR /var/node
#ustawienie portu 1999
EXPOSE 1999
#uruchomienie serwera
CMD ["node", "serwer.js"]
