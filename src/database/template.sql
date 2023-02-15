-- Active: 1676459458723@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Fulano", "fulano@email.com", "fulano123", "NORMAL"),
	("u002", "Beltrana", "beltrana@email.com", "beltrana00", "NORMAL"),
	("u003", "Astrodev", "astrodev@email.com", "astrodev99", "ADMIN");

CREATE TABLE playlists (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    name TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO playlists (id, creator_id, name)
VALUES
    ("p001", "u001", "Samba churrasco"),
    ("p002", "u001", "Rock and Roll"),
    ("p003", "u002", "Coding Focus");

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    playlist_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (playlist_id) REFERENCES playlists (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO likes_dislikes (user_id, playlist_id, like)
VALUES
    ("u002", "p001", 1),
    ("u003", "p001", 1),
    ("u002", "p002", 1),
    ("u003", "p002", 1),
    ("u001", "p003", 1),
    ("u003", "p003", 0);

UPDATE playlists
SET likes = 2
WHERE id = "p001";

UPDATE playlists
SET likes = 2
WHERE id = "p002";

UPDATE playlists
SET likes = 1
WHERE id = "p003";

UPDATE playlists
SET dislikes = 1
WHERE id = "p003";

SELECT
    playlists.id,
    playlists.creator_id,
    playlists.name,
    playlists.likes,
    playlists.dislikes,
    playlists.created_at,
    playlists.updated_at,
    users.name AS creator_name
FROM playlists
JOIN users
ON playlists.creator_id = users.id;

SELECT * FROM playlists;
SELECT * FROM likes_dislikes;
