import express from 'express';
import fetch from'node-fetch';
const app = express();

var moja_data = new Date().toLocaleString('pl-PL');
var port = 1999;

function jaki_czas(ip) 
{
      var strefa_czasowa = fetch(`http://ipapi.co/${ip}/timezone`);
      var data_ip = new Date().toLocaleString('pl-PL', {strefa_czasowa});
      return `${data_ip}`;
} 

app.use((req, res) => {
        var data_ip =  jaki_czas(req.ip);
        res.send(`<p>IP klienta: ${req.ip} \n </p><p>Data i czas klienta:  ${data_ip}</p>`);
    });

console.log("Dzisiejsza data: " + moja_data);
console.log("Autor: Dawid Nicpon");
console.log("Numer portu TCP: " + port);
app.listen(port, '0.0.0.0');
