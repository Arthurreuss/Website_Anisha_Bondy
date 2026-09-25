# Hosting – Einrichtung und Veröffentlichen

Stand: 2026-09-25 · Entscheidung D-032. Schritte für den User (Konten gehören Arthur/Anisha, Claude hat keinen Zugang).

## Branches – wann wird veröffentlicht?

- `main` = Arbeitsstand. Claude committet und pusht hierhin, **das löst keinen Deploy aus**.
- `production` = was live ist. Nur auf Zuruf („veröffentlichen“) bringt Claude `production` auf den Stand von `main` (Fast-Forward) und pusht – dann baut Cloudflare einmal.

## 1 · Cloudflare Pages (einmalig)

1. Auf dash.cloudflare.com kostenlos registrieren.
2. **Workers & Pages → Create → Pages → Connect to Git** → GitHub verbinden, Repo `arthurreuss/website_anisha_bondy` wählen.
3. Einstellungen:
   - Production branch: **`production`**
   - Framework preset: **Nuxt.js** (oder „None“)
   - Build command: **`npm run generate`**
   - Build output directory: **`dist`**
4. **Environment variables** (Production):
   - `NUXT_PUBLIC_WEB3FORMS_KEY` = Zugangsschlüssel aus Schritt 2
   - `SITE_URL` = die endgültige Adresse, z. B. `https://anishabondy.de` (bis die Domain steht: die `…pages.dev`-Adresse)
   - Node-Version kommt aus `.node-version` (22).
5. **Settings → Builds → Branch control:** „Preview branches“ auf **None** stellen – sonst baut Cloudflare zusätzlich bei jedem Push auf `main`.
6. Speichern → erster Build. Die Seite ist danach unter `<projekt>.pages.dev` erreichbar.

Umgebungsvariablen wirken erst beim nächsten Build (Deployments → „Retry deployment“).

## 2 · Kontaktformular: Web3Forms (einmalig)

- Kein Konto mit Passwort nötig: auf **web3forms.com** die E-Mail-Adresse eingeben, an die Anfragen gehen sollen (Anishas Adresse, anfrage-anisha §1.1) → der **Access Key** kommt per Mail an diese Adresse.
- Der Key steht als Standardwert in `nuxt.config.ts` (seit 2026-09-25); `NUXT_PUBLIC_WEB3FORMS_KEY` in Cloudflare ist optional und überschreibt ihn (z. B. bei neuem Empfänger). Er ist öffentlich (steht im Seitenquelltext) – das ist bei Web3Forms so vorgesehen; er erlaubt nur, Mails an genau diese Adresse zu schicken.
- Gratis-Tarif: begrenzte Zahl Einsendungen pro Monat (bei Anlage prüfen, für ein Portfolio reichlich). Spam-Schutz: unsichtbares Honeypot-Feld.
- Optional: über den Link in der Mail ein Dashboard öffnen (Einsendungen ansehen, Empfänger ändern).
- Test: Formular auf der Seite abschicken → Mail „Website-Anfrage: <Name>“ muss ankommen; Antworten gehen per „Antworten“ direkt an die absendende Person.

## 3 · Domain

- **Cloudflare Registrar** verkauft Domains zum Einkaufspreis, aber **nicht jede Endung** – `.de` gibt es dort (Stand der Recherche) nicht, `.com` schon.
- Weg für `.de`: bei einem Registrar kaufen (z. B. INWX, siehe anfrage-anisha §5), dann in Cloudflare **Add a domain** (Free-Plan) und beim Registrar die zwei **Nameserver** von Cloudflare eintragen. Danach verwaltet Cloudflare das DNS.
- In Pages → Projekt → **Custom domains** → Domain (und `www.`) hinzufügen; HTTPS stellt Cloudflare automatisch aus.
- Danach `SITE_URL` auf die Domain setzen und neu bauen (für hreflang/canonical).

## 4 · Netlify

Bleibt nur übergangsweise: dort Production Branch auf `production` stellen, damit Pushes auf `main` keine Credits mehr kosten. Netlify-Formulare werden nicht mehr genutzt; nach dem Umzug die Netlify-Seite löschen und `netlify.toml` entfernen.
