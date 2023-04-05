CREATE TABLE IF NOT EXISTS trainingdays (
    id INT PRIMARY KEY,
    day TEXT DEFAULT CURRENT_DATE,
    notes TEXT
);


CREATE TABLE IF NOT EXISTS exercises (
    id INT PRIMARY KEY,
    name TEXT,
    trainingday INT,
    FOREIGN KEY (trainingday) REFERENCES trainingdays (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT OR IGNORE INTO trainingdays (id, notes) VALUES (1, 'Sample One');

INSERT OR IGNORE INTO exercises (id, name, trainingday) VALUES (1, 'Snatch', 1),
(2, 'Clean and Jerk', 1);

INSERT OR IGNORE INTO trainingdays (id, notes) VALUES (2, 'Sample Two');

INSERT OR IGNORE INTO exercises (id, name, trainingday) VALUES (
    3, 'Back Squat', 2
);

--
-- CREATE TABLE IF NOT EXISTS exercisesets (
--     id INT PRIMARY KEY,
--     exercise INT,
--     sets INT,
--     repetitions TEXT,
--     completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)),
--     FOREIGN KEY (exercise) REFERENCES exercises (id)
--     ON DELETE CASCADE ON UPDATE CASCADE
-- );
