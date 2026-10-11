# White Man Cataclysm — Firelands Community Site

A responsive, single-page community landing site for a Cataclysm Classic fan community. Built with React, TypeScript, Vite, and a custom procedural Three.js scene. No game art or game client assets are bundled.

## Run locally

1. Install Node.js 20 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL printed in the terminal.
4. Run `npm run build` to create the static site in `dist/`.

## Configure the community details

Edit `src/config.ts` after the organizers confirm the public links and plans:

- `discord`: invite URL (leave blank to keep using the setup placeholder)
- `serverAddress`: verified server connection address
- `accountSignup`: verified account registration URL
- `raidSchedule` and `raidTimezone`: confirmed raid time
- `realmStatus`: short, accurate community status

Do not add unverified download or account links. The website intentionally does not collect credentials or promise server security.

## Publish on Vercel

Import this folder as a Vercel project or connect its Git repository. Vite is auto-detected; the production build command is `npm run build` and the output directory is `dist`.

## Included experience

- Interactive WebGL volcanic landscape with ambient ember particles and pointer parallax
- Reduced-motion support and responsive navigation
- Raid recruitment, onboarding steps, community code, and FAQ
- Clear unofficial-fan-site and private-server risk note
- Editable placeholders instead of fabricated server details
