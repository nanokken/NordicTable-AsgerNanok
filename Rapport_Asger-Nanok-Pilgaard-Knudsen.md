# Nordic Table 2026

Dette projekt består af to dele:

- en React/Vite-frontend i projektets rod
- en Node/Express-backend i `server/mcd_web_nordic_table_server`

## Kom i gang

Følg trinene herunder for at få projektet til at køre lokalt.

### 1. Installér pakker til frontend

Kør i projektets rod:

```bash
npm install
```

### 2. Installér pakker til backend

Gå til servermappen og installér pakker:

```bash
cd server/mcd_web_nordic_table_server
npm install
```

### 3. Kontrollér `.env.local`

I backend-mappen skal filen `.env.local` være sat op korrekt.

Vigtigt:

```env
USE_JWT=true
```

Filens placering er:

```text
server/mcd_web_nordic_table_server/.env.local
```

### 4. Opret databasen

Kør i backend-mappen:

```bash
npm run "Opret Database"
```

### 5. Start backend-serveren

Kør i backend-mappen:

```bash
npm run "Start Server"
```

### 6. Start frontend

Åbn en ny terminal i projektets rod og kør:

```bash
npm run dev
```

## Projektstruktur

```text
src/                                       Frontend
server/mcd_web_nordic_table_server/        Backend og database
```

## Vigtige noter

- Installér npm-pakker, før du starter projektet.
- Start backend-serveren, før du arbejder med login, data eller API-kald.
- Hvis der opstår mærkelige loginproblemer, så prøv at rydde `localStorage` i browseren.
- Backend-projektet har også sin egen README med flere detaljer om miljøvariabler og Postman.

---

## Svendeprøve - Nordic Table

16/04-2026  
Skrevet af: Asger Nanok Pilgård Knudsen  
Github: https://github.com/nanokken/NordicTable-AsgerNanok

**Login:**  
admin: admin@mediacollege.dk, Kode: admin  
guest: guest@mediacollege.dk, Kode: guest

---

## Vurdering af egen indsats

Jeg har i opgaven brugt Vite React, da det er det framework jeg har brugt mest. Jeg har brugt TailwindCSS til at style mine komponenter og få styling hurtigere sat op med en nordisk, minimalistisk æstetik. Derudover har jeg brugt GitHub til at holde styr på min proces og dokumentere min fremgang gennem commits.

Min tidsplan har jeg forsøgt at holde struktureret. Jeg startede med grundlæggende opsætning og navigation, og byggede derefter gradvist videre med sider og funktionalitet. Jeg brugte god tid på backoffice-delen med CRUD-operationer, da det var vigtigt for mig at få en solid admin-oplevelse. Menuen og de sidste optimeringer blev lavet til sidst, så det hele hænger godt sammen.

---

## Redegørelse for kodeelementer

- Jeg har valgt at bruge **react-router-dom** til mine routes og navigation, inklusiv nested routes og protected routes.
- Jeg bruger **localStorage** til at gemme JWT-token, sådan at browseren kan huske om du er logget ind.
- Jeg har lavet en **AuthContext** med `useAuth()` hook til at håndtere login/logout og brugerdata gennem hele applikationen uden prop drilling.
- Jeg har lavet en generisk **useCRUD hook**, som kan genbruges til alle ressourcer (dishes, bookings). Den håndterer GET, POST, PUT og DELETE med automatisk token-håndtering og state management.
- **TailwindCSS** er brugt til al styling med mobile-first responsive design tilgang.
- Jeg bruger custom Tailwind-tema med farver og fonts defineret via CSS custom properties – primærfarve #7C632F (varm brun/guld) og Cormorant Garamond som serif-font for at skabe et nordisk, elegant udtryk.
- Jeg bruger **React.lazy()** og **Suspense** til lazy-loading af sider for bedre performance.
- Backend bruger **Express 5** med **MongoDB/Mongoose**, **JWT** til autentificering, **bcryptjs** til password-hashing og **Multer** til fil-upload af retter-billeder.

---

## Fremhævelse af punkter til bedømmelse

Til min mundtlige eksamen vil jeg gerne fortælle om:

- **Backoffice** – CRUD-funktionalitet til både retter og reservationer, med image upload, status-håndtering og en brugervenlig admin-oplevelse.
- **useCRUD hook** – Min genanvendelige hook der eliminerer boilerplate-kode og gør det nemt at tilføje nye ressourcer. Den håndterer authorization headers, FormData for fil-uploads og automatisk state-opdatering.
- **AuthContext og ProtectedRoutes** – Hvordan jeg har implementeret role-based access control, så kun admins kan tilgå backoffice.
- **Komponent-genbrug** – Jeg har genbrugt flere komponenter på tværs af sider, f.eks. PageHeader, Footer og BookingSection, for at holde koden DRY.

---

## Git commit timeline

Følgende viser min proces gennem projektet:

### 16. april 2026:
- **16:57** – Optimering af hele projektet, finpudsning og polish

### 15. april 2026:
- **15:00** – Menu-side lavet med kategorier (Starter, Main, Dessert) og dynamisk data fra API
- **11:11** – Fix i backoffice til brugervenlighed

### 14. april 2026:
- **16:53** – Tilføjet backoffice med fuld CRUD-funktionalitet, 404-side, sticky navigation og scroll-to-top
- **12:57** – Tilføjet booking-side med komponentstruktur og footer

### 13. april 2026:
- **14:31** – Login lavet, samt tilføjet fonts og farver til det nordiske tema
- **12:28** – Basic startup med react-router-dom, navigation og ProtectedRoutes
- **11:18** – Initial commit
