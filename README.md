# AnimalyCraft

A small, playable browser adventure for ages 7–10. Explore a procedural Three.js island, solve server-validated math missions, grow the camp, and unlock five animal explorers whose powers change routes through the world.

## Run locally

1. Install Node.js 20+ and MongoDB 7+ (or create a free MongoDB Atlas database).
2. Run `npm install`.
3. Copy `.env.example` to `.env` and update `MONGODB_URI`. Keep `SESSION_SECRET` private.
4. Start MongoDB if using it locally.
5. Run `npm run seed` (optional content snapshot) and `npm run dev`.
6. Open `http://localhost:3000`.

Production-like start: `npm start`. Tests: `npm test`.

If MongoDB is unavailable, the server exits with setup steps instead of presenting unsaved gameplay.

## Controls

- WASD or arrow keys: move
- Space: jump
- E: interact with glowing paw markers or the shop
- Q: use the equipped explorer's power
- Tablet: on-screen movement, jump, interact, and power buttons

## Where to customize

- Missions, reward balance, prices, and power descriptions: `src/config/game.js`
- Server-side validation/reward rules: `src/services/gameService.js`
- Island layout and power demonstrations: `public/js/world.js`
- Character geometry: `public/js/characters.js`
- Colors, type, HUD, and responsive layout: `public/css/styles.css`

## Prototype notes

The anonymous profile is tied to a long-lived HTTP-only session cookie. Mission claims and purchases use conditional atomic MongoDB updates, so repeated requests cannot duplicate a mission reward or purchase deduction. This first version uses simple boundary and ground collision rather than a full physics engine. Procedural emoji/card portraits are used in menus while the in-world characters are original rounded Three.js models.
