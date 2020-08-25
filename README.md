# ShoppingKata

## Lokales Ausführen der Anwendung

1. Das Repo klonen mit `git clone https://github.com/igors2412/shopping-kata.git`.
2. NodeJS installieren - [Link](https://nodejs.org/en/download/).
3. Angular CLI als globales Package installieren mit `npm i -g @angular/cli`.
4. Im Projektordner Dependencies installieren mit `npm i`.
5. Development Server starten mit `ng serve` und folgenden [Link](http://localhost:4200) öffnen.
6. Tests können in der Konsole mit `npm run test-ci` ausgeführt werden oder alternativ mit `ng test` im Browser.

## Komponenten

### App component

Enthält den Header mit Navigations-Links und den Content Bereich in dem andere Views gerendert werden.

### Add to cart component

Der Pop-up Dialog über den ein Artikel in den Warenkorb hinzugefügt wird.

### Cart component

Warenkorb Ansicht.

### Empty logo component

Das SVG was anzeigt, dass der Warenkorb leer ist.

### Home component

Startseite. Lädt die Liste der Artikel aus der JSON Konfigurationsdatei und zeigt sie an.

### Product component

Eine Artikel-Kachel mit den wichtigsten Infos und der Option den Artikel in den Warenkorb hinzuzufügen.

## Datenmodell

Das JSON Schema ist in `/src/data` beschrieben. Ich habe mich entschieden die Spezialpreis Werte als Eigenschaft von dem Artikel selber zu tragen anstatt einer Lookup Tabelle. Jeder Artikel wird zudem noch von einer View Model Schicht shadowed, die den Preisalgorithmus enthält sowie weitere nützliche UI Logik. `data` enthält ebenso die Testdaten, die von den Komponenten und den Unit Tests genutzt werden.

## Services

### Product service

Dient als Brücke zwischen den Testdaten und den UI Komponenten. Mit einem delayed Observable simuliert der Service einen echten http Call.

### Cart service

Dient als Zwischenspeicher für den Warenkorb und als single source of truth in der asynchronen Kommunikation zwischen nicht-verwandten Komponenten. Als Speicher wird das Browsereigene local storage genutzt. Somit wird gewärleistet, dass der Warenkorb nach dem Refresh der Anwendung erhalten ist. Zusätzlich implementiert der Service einen publisher/subscriber Mechanismus mittels eines RXJS Subjects. Somit können Komponenten über den Service auf Änderungen des Warenkorbs lauschen und immer einen synchronen Datenstand haben.
