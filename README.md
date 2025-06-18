# Sunday League F1 25

Welcome to **Sunday League F1 25**, an online Formula 1 league for drivers around the world. We host weekly races every Sunday evening using fair and competitive rules.

## Key Features

- Short qualifying (full if 18+ drivers) followed by 50% distance races
- Equal car performance with realistic settings
- Dynamic weather and standard damage
- Active Discord community with social events and open lobbies
- Roles available for drivers, reserves, commentators and FIA members

## Race Schedule

Races are held Sundays at **7 PM UK / 8 PM CET**, subject to the real-world F1 calendar.

Results and championship standings are pulled directly from the bundled database.

Join us on [Discord](https://discord.gg/slf1) to secure your seat for the upcoming F1 25 season!

## Database Endpoints

The site exposes read‑only APIs that pull data from the bundled **Racing League Tools** SQLite database:

- `/api/drivers` – list of all registered drivers
- `/api/tracks` – list of tracks (`?season={id}` for a specific season)
- `/api/db-results` – latest season results (limit 100) with driver, position and circuit
- `/api/driver-standings` – driver championship standings
- `/api/constructor-standings` – constructor championship standings

These endpoints run SQLite queries directly on `SLF1_DB/user/databases/SLF1.db`.

## Running with PM2

For dynamic hosting environments you can keep the Next.js server running using [PM2](https://pm2.keymetrics.io/).

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the server with PM2:
   ```bash
   PORT=3000 SEASON_ID=3 pm2 start ecosystem.config.js
   ```
   Set `PORT` to your desired port and any other environment variables (like `SEASON_ID`) before running the command. PM2 will monitor the process and restart it if needed.

Use `pm2 logs` to view logs and `pm2 list` to manage running apps.
