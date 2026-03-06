# Fake News SaaS Workspace

Monorepo for web, mobile, and Python API.

## Structure

- `apps/web` - Next.js web app (copied from your existing UI)
- `apps/mobile` - React Native/Expo app scaffold
- `services/api` - FastAPI backend scaffold
- `packages/contracts` - shared API contract artifacts
- `packages/ui-tokens` - shared design tokens
- `packages/config` - shared workspace configs

## Quick start

### 1) Install workspace tooling

```bash
cd /home/tanvir-sheikh/projects/fake-news-saas
pnpm install
```

### 2) Run web app

```bash
pnpm dev:web
```

### 3) Run API app

```bash
cd services/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 4) Bootstrap mobile app (next step)

```bash
pnpm dlx create-expo-app apps/mobile
```

## Notes

- Current `apps/web` functionality is unchanged from your source app.
- Next phase: move auth/quota enforcement to API and consume from web/mobile via shared contracts.
