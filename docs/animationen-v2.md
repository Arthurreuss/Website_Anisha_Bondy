# Animationen v2 – Soll-Werte aus dem Original

Stand: 25.09.2026. Grund: Nutzbarkeitstest des Users (D-023). Werte aus dem ausgelieferten JavaScript von brandonyasin.com gelesen (nur Zahlen, Easings, Abläufe – kein Code übernommen). Ergänzt die eingefrorene [analyse-referenz-brandonyasin.md](analyse-referenz-brandonyasin.md) §4–§6.

Easings (Cubic-Bézier, als GSAP `CustomEase`):

| Name | Kurve | Einsatz |
|---|---|---|
| slowStart | `0.9, 0, 0.58, 1` | Stapel wächst, andere Karten beim Verlassen |
| reveal / morph | `0.46, 0, 0.09, 1` | Aufdecken, Flug in die Reihe, Bild-Morph, Next-Case-Flug |
| zoomBump | `0.5, 0, 0.5, 1` | kurzer Zoom-Buckel der Medien im Intro |
| pageSpread | `0.46, 0, 0.09, 0.99` | Seitenübergang „Fenster“, Menü |

## 1. Intro der Startseite (P18)

Ist: Stapel startet bei Skalierung 0.8, jede tiefere Karte +3.5 % größer (liegen nicht deckungsgleich), wächst nicht, alles ≈ 3 s, Namen gleiten schon während des Flugs ein.

Soll (Desktop; Mobil in Klammern):
1. Nur die **ersten 4 Karten** (mobil 2) spielen mit; der Rest ist unsichtbar bzw. blendet aus. Vorher auf die Bilder warten (max. 4 s).
2. **Start nach 0.6 s.** Alle Karten liegen **deckungsgleich** in der Bildschirmmitte (Skalierungsunterschied nur 0.001 je Karte), Startgröße **0.4** (0.37), `clip-path` zu (Linie oben).
3. **Stapel wächst** in **2.88 s** von 0.4 → **0.7** (0.37 → 0.74), Ease slowStart. Innenbild gleichzeitig 1.5 → 1.2.
4. **Aufdecken von oben nach unten**, je 1.3 s, Ease reveal – die unterste Karte zuerst, Startzeiten **0 / 0.76 / 1.3 / 1.58 s**. Die zuletzt aufgedeckte liegt oben.
5. **Runterfallen in die Reihe** ab 2.88 s, versetzt um **0 / 0.27 / 0.5 / 0.7 s** (mobil 0 / 0.15), alle landen gleichzeitig bei **4.53 s** (x/y → 0, Skalierung → 1). Innenbild: kurzer Zoom-Buckel auf 1.3, dann auf 1.15.
6. **Erst danach die Titel:** ab **4.5 s** (mobil 4.1 s) gleiten die Namen von unten ein, 0.8 s, `power2.out`, versetzt 0.15 s. Während des ganzen Intros sind **keine Titel** sichtbar.
7. Gesamtdauer ≈ **6 s**. Ziehen der Galerie erst ab Landung (4.53 s).

## 2. Hover auf einer Karte (P19)

Nur Desktop: Karte **y −8 px**, Bild darin gegenläufig **y +4 px** (leichter Parallax-Eindruck), 0.6 s `power2.out`; beim Verlassen zurück auf 0. Namens-Roll (0.4 s) bleibt. Gleiches Anheben auf dem Next-Case-Bild der Detailseite. Beim Klick fällt die Karte in 1.27 s auf y 0 zurück.

## 3. Klick Karte → Detailseite (P20)

Ist: andere Karten 0.9 s, Morph startet sofort parallel (1.26 s) – wirkt hastig.

Soll: zwei Phasen, gesamt ≈ **2.5 s**.
- **Phase 1 (0–1.27 s):** andere Karten schrumpfen auf 0.7 (Ursprung `50% 40%`), Medien zoomen auf 1.4; ihr Bild wird nach oben weggeschnitten und der Name fällt – **gestaffelt nach Abstand** zur geklickten Karte (0 / 0.33 / 0.56 s, dann +0.23 s je weitere). Name der geklickten Karte fällt sofort. Ease slowStart.
- **Phase 2 (ab 1.27 s, 1.26 s):** Klon morpht in das Hero-Bild, Ease morph. Video läuft weiter (wie D-015).

## 4. Detailseite → nächstes Projekt (P21)

Ist: normaler Seitenwechsel ohne Animation (abrupt).

Soll (Desktop, gesamt ≈ 2.6 s; alte Seite wird als fixierte Ebene eingefroren):
- **0–0.6 s:** Hero und Inhalt der alten Seite blenden aus (alles außer dem Next-Bereich).
- **0 s:** die letzten zwei Galeriebilder werden **nach oben weggeschnitten** (1.2 s) und ihre Beschriftungen fallen – das ist der „Balken in Hintergrundfarbe, der alles ausradiert“.
- **0.2 s:** „next case“ rollt nach oben weg (1.2 s).
- **1.2 s:** das Next-Bild (unten rechts) fliegt als fixiertes Element **groß nach rechts oben** in die Hero-Position der neuen Seite (1.3 s, Ease morph); Video-Zeit wird übernommen.
- **1.38 s:** der Projekttitel fliegt als Klon an die Titelposition der linken Spalte (1.18 s); **1.61 s:** Meta-Zeilen folgen (0.89 s).
- Mobil: statt Titel-Flug rollen die Titelzeilen nach oben weg, Bild-Flug gleich.

## 5. Seitenübergang „Fenster“ (P22) – u. a. Detailseite → Startseite über den Namen

Ist: sofortiger Wechsel.

Soll (Ease pageSpread, gesamt ≈ 2.7 s):
- **Phase 1 (1.3 s):** die alte Seite schrumpft auf **0.75** (mobil 0.6), wird auf ein Fenster zugeschnitten (`--cut` 37.4 %) und rückt zur Seite; die neue Seite kommt als gleich kleines Fenster von der Seite herein. Auf jedem Fenster rollt der **große Seitentitel** ein (z. B. „Work“, „About“).
- **Phase 2 (nach 0.1 s bzw. 0.367 s bei „zurück“, 1.3 s):** das neue Fenster zoomt auf Vollbild (Skalierung 1, Schnitt 100 %), der Seitentitel rollt weg; die alte Seite fährt ganz hinaus (×1.15).
- Richtung: vorwärts von rechts, **zurück (zur Startseite) von links**.
- Gilt für alle Wechsel außer Startseite → Case (§3) und Case → Case (§4).

## 6. Menü mit Seitenvorschau (P23)

Ist: Text-Overlay, das in 0.6 s von oben aufgeht.

Soll: Beim Öffnen schrumpft die aktuelle Seite zu einem Fenster (wie §5 Phase 1), daneben gleiten **Live-Vorschauen der anderen Seiten** (Work, Archive, About) als Fenster herein, versetzt 0.06 s; beim Hover rücken sie leicht nach. Ein Klick auf ein Fenster zoomt es auf Vollbild (§5 Phase 2). Schließen: aktuelles Fenster zoomt zurück. Kontakt bleibt Overlay.
