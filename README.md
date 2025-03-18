```
docker compose up -d
mv .env.develop .env
pnpm i
pnpm prisma db push
pnpm run start:dev
```
