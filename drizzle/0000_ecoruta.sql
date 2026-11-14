CREATE TABLE users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, role TEXT NOT NULL CHECK(role IN ('driver','passenger')));
--> statement-breakpoint
CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires INTEGER NOT NULL);
--> statement-breakpoint
CREATE TABLE trips (id TEXT PRIMARY KEY, driver_id TEXT NOT NULL REFERENCES users(id), origin TEXT NOT NULL, destination TEXT NOT NULL, departure TEXT NOT NULL, meeting TEXT NOT NULL, capacity INTEGER NOT NULL CHECK(capacity BETWEEN 1 AND 6), cost REAL NOT NULL CHECK(cost BETWEEN 0 AND 100), status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','cancelled','completed')), created TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE requests (id TEXT PRIMARY KEY, trip_id TEXT NOT NULL REFERENCES trips(id), passenger_id TEXT NOT NULL REFERENCES users(id), status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected','cancelled')), created TEXT NOT NULL, UNIQUE(trip_id,passenger_id));
--> statement-breakpoint
CREATE INDEX trips_departure ON trips(departure,status);
--> statement-breakpoint
CREATE INDEX requests_trip ON requests(trip_id,status);
--> statement-breakpoint
CREATE TABLE login_attempts (key TEXT PRIMARY KEY, failures INTEGER NOT NULL DEFAULT 0, blocked_until INTEGER NOT NULL DEFAULT 0);
