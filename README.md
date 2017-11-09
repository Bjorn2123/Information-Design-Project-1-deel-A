# Information-Design-Project-1-deel-A

## Documentatie Project deel A

### Concept
Dementie is al jaren lang een ziekte waar steeds meer ouderen mee kampen en uiteindelijk aan overlijden. Het is een ziekte waarvan eenderde bepaald wordt door beïnvloedbare risicofactoren maar waarbij de belangrijkste niet-beïnvloedbare risicofactoren leeftijd, geslacht en genen zijn. Het hoofdonderwerp voor dit project is net zoals Research for Data dementie. Voor dit project heb ik iets van dit onderwerp afgeweken en heb ik ervoor gekozen om in te gaan op de risicofactoren van dementie en te onderzoeken wat voor invloed deze hebben op dementie en het krijgen ervan. 

Het concept bestaat uit 4 grafieken waarmee ik wil laten zien dat wanneer het jaar vanaf 2014 vordert het aantal mannen en vrouwen die risicofactoren hebben ook vordert en dus het aantal overledenen aan dementie vordert.

### Data

De data waarmee ik voor deel A mee aan de slag ben gegaan zijn de ![sterfgevallen dementie](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=7233&D1=422%2c424&D2=1-2&D3=0&D4=a&HDR=G2%2cG1&STB=G3%2cT&VW=T) en ![leeftstijl & persoonskenmerken](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=83021ned&D1=0,3,5,15-16,19,21,26,41,47-48,59,71&D2=0-13,30-42&D3=0&D4=l&VW=T) op de website van het CBS. 

### Opschoon proces
Omdat deze data ruwe data is heb ik het voor het visualiseren moeten opschonen. Dit opschoonproces heb ik toegepast bij mijn eerste grafiek en heb ik gedaan met de volgende set code:
```js
var header = doc.indexOf('Perioden');
    var footer = doc.indexOf('Centraal Bureau voor de Statistiek') - 2;
    var end = doc.indexOf('\n', header);
    doc = doc.substring(end, footer).trim();
    
    function map(d) {
        return {
            Perioden: Number(d[0]),
            Totaal: Number(d[1]) + Number(d[3]) + Number(d[2]) + Number(d[4]),
            Mannen: Number(d[1]) + Number(d[3]),
            Vrouwen: Number(d[2]) + Number(d[4])
        }

    }
``` 

### Functionaliteit

De functie van grafiek 1 is het visueel laten zien hoeveel mensen er in het jaar 2006 tot en met 2016 overleden zijn aan dementie. Deze grafiek bevat een tooltip waardoor er na beweging op elke bar te zien is hoeveel mensen er precies dat jaar zijn overleden aan dementie. Naast deze functionaliteit is grafiek 1 ook te sorteren op aflopende hoeveelheid. Zo is duidelijk te zien wat het verschil is per jaar. 

De functionaliteit van de drie andere grafieken is het per risicofactoren laten zien hoeveel het percentage mannen en vrouwen is dat dat betreffende risico voor dementie heeft. Ook deze grafieken bevatten een tooltop zodat het het precentage weer duidelijk te zien is wanneer er over een bar bewogen wordt. 

### Bronnen
Het onderzoek is begonnen met de bronnen die ik onderzocht heb voor het vak Research for Data. Omdat ik het onderwerp daarvan voor dit project deels heb aangepast ben ik verder gaan werken met de Risicofactoren. De twee hoofdzakelijke bronnen die ik gebruikt heb staan aangegeven bij Data. De andere bronnen die ik gebruikt heb staan onderaan aangegeven:

* ![https://www.vanderakt.nl/downloads/wat-zien-wij-wat-zien-zij.pdf](https://www.vanderakt.nl/downloads/wat-zien-wij-wat-zien-zij.pdf)
* ![https://dementie.nl/over-dementie/geheugenverlies-vergeetachtigheid-of-dementie](https://dementie.nl/over-dementie/geheugenverlies-vergeetachtigheid-of-dementie)
* ![https://www.alzheimer-nederland.nl/nieuws/bloeddruk-en-de-kans-op-alzheimer](https://www.alzheimer-nederland.nl/nieuws/bloeddruk-en-de-kans-op-alzheimer)
* ![https://dementie.nl/preventie/oorzaken-risicofactoren-en-preventie-van-dementie](https://dementie.nl/preventie/oorzaken-risicofactoren-en-preventie-van-dementie)
* ![https://www.alzheimer-nederland.nl/sites/default/files/directupload/gezond-leven-verkleint-kans-dementie.pdf](https://www.alzheimer-nederland.nl/sites/default/files/directupload/gezond-leven-verkleint-kans-dementie.pdf)
* ![https://www.nrc.nl/nieuws/2017/05/16/levensstijl-bepaalt-helft-van-dementiekans-9172600-a1558967](https://www.nrc.nl/nieuws/2017/05/16/levensstijl-bepaalt-helft-van-dementiekans-9172600-a1558967)
* ![https://www.alzheimer-nederland.nl/dementie](https://www.alzheimer-nederland.nl/dementie)
