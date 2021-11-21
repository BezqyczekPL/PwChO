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
  
## Zadanie 2

Kolejne kroki:

Aby wykonać to zadanie, trzeba uzyskać certyfikat z urzędu certyfikacji (CA).
Następnie skopiować pliki domain.crt i domain.key do katalogu z certyfikatami (certs).

Następująca komenda montuje katalog w kontenerze za pomocą portu 443 (https)
  ``docker run -d \
  --restart=always \
  --name registry \
  -v "$(pwd)"/certs:/certs \
  -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  -p 443:443 \
  registry:2``
  
  Od tego momentu można przejść do właściwej części zadania:
  

1. Należy utworzyć plik z hasłem (podany użytkownik i hasło):
  ``mkdir auth
  docker run \
  --entrypoint htpasswd \
  httpd:2 -Bbn BezqyczekPL haslo123 > auth/htpasswd``
  
2. Uruchomić rejestr z podstawową autoryzacją

  ``docker run -d \
  -p 6677:6677 \
  --restart=always \
  --name registry \
  -v "$(pwd)"/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  -v "$(pwd)"/certs:/certs \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  registry:2``
  
 3. Zalogować się do rejestru:
 ```docker login myregistrydomain.com:6677```
 
 4. Od tego momentu zapewniony jest standardowy mechanizm kontroli dostępu do obrazu.

