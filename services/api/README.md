# API Service (FastAPI)

Backend supports:
- Guest users: 5 lifetime analyses
- Registered users: 30 analyses per month
- Paid users: unlimited (future policy constraints can be added)
- Real fake-news detection model via Hugging Face (`jy46604790/Fake-News-Bert-Detect`)

## Run locally

```bash
cd services/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

On first request to `POST /v1/detect`, model weights are downloaded automatically.

## Endpoints

- `GET /health`
- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `GET /v1/auth/me`
- `POST /v1/auth/logout`
- `GET /v1/quota/status`
- `POST /v1/detect`

## Auth

Use bearer token returned by `register` or `login`:

`Authorization: Bearer <token>`

For guest requests, send:

`x-guest-id: <stable-client-id>`

## Model config

Set model id in `.env` if needed:

`HF_MODEL_ID=jy46604790/Fake-News-Bert-Detect`
