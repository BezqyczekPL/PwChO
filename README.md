# Zadanie 3 

## a.	```docker build -f Dockerfile -t local .```

Zbuduj obraz local z pomocą pliku Dockerfile

## b.	```docker run -p 2111:1999 -d --rm --name Projekt local```

Uruchom obraz local w kontenerze o nazwie Projekt w trybie w tle, port maszyny macierzystej – 2111, port kontenera – 1999, jeśli jest już podobny kontener, to go usuń

## c.	```docker logs Projekt```

Pokaż logi z kontenera Projekt

## d.	```docker image inspect local | jq ".[] .RootFS"```

Sprawdź informacje o obrazie local, a konkretnie te o liczbie warstw. Mój obraz ma ich 5.


# Zadanie 4

1. Aby zbudować obraz wykorzystując bezpośrednio link do Dockerfile umieszczonego na GitHub należy użyć  polecenia: **```docker build adresURLDoRepozytoriumGitHub```**.
2. Aby przenieść stworzony obraz na swoje konto na DockerHub należy użyć poleceń: **```docker tag nazwaObrazu:nazwaTagu nazwaRepozytorium:nazwaTagu```** i **```docker push nazwaRepozytorium:nazwaTagu```**.

# Zadania dodatkowe

## Zadanie 1
a) Uruchomienie registry o nazwie rejestr w wersji domyślnej, działający w tle, na porcie 6677: **``` docker run -d -p 6677:6677 --name rejestr registry:2```** 
b) Pobranie najnowszej wersji obrazu ubuntu: **```docker pull ubuntu```**
  Zmiana nazwy obrazu: **```docker tag ubuntu localhost:6677/nowe_ubuntu```**
  Wgranie obrazu do utworzonego, prywatnego rejestru: **```docker push localhost:6677/nowe_ubuntu```**.

