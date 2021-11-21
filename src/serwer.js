import express from 'express'; //importuj biblioteke 'express'
import fetch from'node-fetch'; //importuj biblioteke 'fetch'
const app = express(); //rozpocznij aplikacje korzystajaca z expressu

var moja_data = new Date().toLocaleString('pl-PL'); //zaladuj do zmiennej moja_data aktualna date w formacie polskim dd.mm.rrrr
var port = 1999; //na tym porcie aplikacja bedzie nasluchiwac 

function jaki_czas(ip) //funkcja zwracajaca aktualna date klienta korzystajac do tego z jego ip
{ //rozpoczecie funkcji
      var strefa_czasowa = fetch(`http://ipapi.co/${ip}/timezone`); //odczytaj strefe czasowa z API ipapi.co wg podanego adresu ip
      var data_ip = new Date().toLocaleString('pl-PL', {strefa_czasowa}); //odczytaj date wg podanej strefy czasowej
      return `${data_ip}`; //zwroc date
} //zakonczenie funkcji

app.use((req, res) => { //rozpoczecie funkcji lambda (zadanie, odpowiedz)
        var data_ip =  jaki_czas(req.ip); //zapisz w zmiennej data_ip date zwrocana z funkcji jaki_czas
        res.send(`<p>IP klienta: ${req.ip} \n </p><p>Data i czas klienta:  ${data_ip}</p>`); //wyswietl w htmlu IP klienta i jego aktualny czas
    }); //zakonczenie funkcji lambda

console.log("Dzisiejsza data: " + moja_data); //zapisz w logach serwera date autora
console.log("Autor: Dawid Nicpon"); //zapisz w logach serwera imie i nazwisko autora
console.log("Numer portu TCP: " + port); //zapisz w logach serwera numer portu TCP
app.listen(port, '0.0.0.0'); //aplikacja zaczyna nasluchiwac
