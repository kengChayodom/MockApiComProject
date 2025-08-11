# Vercel + json-server (Read-Only by default)

Deploy a mock API to Vercel using `json-server` and a `db.json` file.
- **Read-only** by default (GET/HEAD/OPTIONS allowed). Set `READ_ONLY=false` in Vercel env to enable writes.

## Endpoints
With the default `vercel.json`, all routes go to the function. Examples:
- `GET /news`
- `GET /news?_page=1&_limit=10`
- `GET /comments?newsId=101&_page=1&_limit=10`
- `GET /votes?newsId=101`

## Local test
```bash
npm i
npm run start
# Server listens on a random port in Vercel runtime; for local testing you will see console logs.
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → New Project → Import your repo.
3. Framework Preset: "Other".
4. Build Command: (leave empty)
5. Output Directory: (leave empty)
6. Environment Variables (optional):
   - `READ_ONLY` = `true` (default) or `false` to allow POST/PUT/PATCH/DELETE.
7. Deploy.
8. Test endpoints: `https://<your-project>.vercel.app/news?_page=1&_limit=5`

## Notes
- `json-server` supports filtering, sorting, and pagination:
  - `?_page=1&_limit=10`
  - `?_sort=reportedAt&_order=desc`
  - `?newsId=101`
- If you prefer `/api/...` routes, edit `api/server.js` to `server.use('/api', router)` and change `vercel.json` routes accordingly.
- For production classrooms where POST must be blocked, keep `READ_ONLY=true`.
