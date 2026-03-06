import os
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
DB_PATH = os.getenv("APP_DB_PATH", str(BASE_DIR / "app.db"))


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            plan TEXT NOT NULL DEFAULT 'registered',
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            expires_at TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS quota_counters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject_type TEXT NOT NULL,
            subject_id TEXT NOT NULL,
            period_key TEXT NOT NULL,
            used INTEGER NOT NULL DEFAULT 0,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(subject_type, subject_id, period_key)
        )
        """
    )

    conn.commit()
    conn.close()
