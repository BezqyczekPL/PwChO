Zadanie 3
a.	docker build -f Dockerfile -t local .
Zbuduj obraz local z pomocą pliku Dockerfile
b.	docker run -p 2111:1999 -d --rm --name Projekt local
Uruchom obraz local w kontenerze o nazwie Projekt w trybie w tle, port maszyny macierzystej – 2111, port kontenera – 1999, jeśli jest już podobny kontener, to go usuń
c.	docker logs Projekt
Pokaż logi z kontenera Projekt
d.	docker image inspect local | jq ".[] .RootFS"
Sprawdź informacje o obrazie local, a konkretnie te o liczbie warstw. Mój obraz ma ich 5.
