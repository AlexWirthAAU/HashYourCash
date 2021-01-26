
<p align="center"><img src="https://github.com/AlexWirthAAU/HashYourCash/blob/main/src/assets/images/Logo_Banner_integrate.png" height="200"></p>

HashYourCash ist eine im Zuge des Kurses Webtechnologien (WS2020/21) entwickelte Webapplikation zum Tracken von Einnahmen und Ausgaben.

## Team:
  * Goja Beatrice
  * Haack Zoë
  * Siebert Jana
  * Wirth Alex
---
## Aufteilung der Funktionalitäten

### Registrieren und Einloggen (Alex Wirth)
  * Registration mit sicherem Passwort (8 Zeichen, Groß-/Kleinbuchstaben, Zahlen, Sonderzeichen)
  * Einloggen und speichern des erzeugten JWT
  * Passwort vergessen Funktion
  * Integration von Sendgrid
#### Einloggen:  
Der bereits registrierte Benutzer meldet sich mit seiner E-Mail Adressen und Passwort an. 

#### Neuen Account erstellen:  
Der Benutzer wird auf eine neue Seite verwiesen. Dort gibt er seine Benutzerdaten ein. Wenn alle Anforderungen erfüllt wurden, bekommt der Benutzer eine E-Mail worin die weitere Vorgehensweise beschrieben ist. 

#### Passwort vergessen: 
Der Benutzer wird aufgefordert seine E-Mail Adresse anzugeben. Danach wird ein Mail gesendet in welcher der weitere Vorgang beschrieben ist. 

---
### Startseite - Profil (Zoë Haack)
Der Benutzer kann Wallets erstellen. Bei der Erstellung eines neuen Wallets wird nach dem Wallet Namen, einer Beschreibung und dem darin enthaltenen Betrag gefragt. Nach der Erstellung wird das Wallet mit den Anderen Wallets in einer Liste angezeigt. Jedes Wallet hat die Optionen: Bearbeiten, Gehe zum Wallet und Löschen.

#### Gehe zu Wallet:  
Der Benutzer wird auf die Seite weiter geleitet auf der, der Inhalt des Wallets aufgeschlüsselt zu sehen ist. Der Benutzer hat die Möglichkeit eine „Zahlung hinzufügen“.

---
### Zahlung (Jana Siebert)

#### Hinzufügen
Es wird nach den Attributen der Zahlung gefragt: Ein – Auszahlung, Betrag, Kategorie, Zahlungsgrund und Kommentar. Falls der Benutzer keine Zahlung hinzufügen möchte, kann er auf zurück klicken, woraufhin er wieder zum Wallet gelangt oder mit Zahlung verbuchen fortfahren, wobei die Zahlung auf der Liste im Wallet aufscheint. 

#### Bearbeiten
Der Benutzer kann den Gelbetrag, der sich im Walltet befindet, ändern und ein Kommentar hinzufügen bzw. ändern. 

#### Löschen 
Wallet wird gelöscht. 

---
### Statistiken (Alex Wirth) 
Im Wallet kann der Benutzer seine Statistiken ansehen: 

Es werden Ein – und Auszahlungen im Balken bzw. Kreisdiagramm dargestellt. Es kann eine spezielle Kategorie so wie Zeitraum bestimmt werden. 

---
### Währungsrechner (Beatrice Goja) 
Der Benutzer hat die Möglichkeit verschiedene Währungen umzurechnen. Auch wird der Preis von Bitcoin sowie 5 Währungspaare direkt in real time angezeigt und automatisch aktualisiert. 
