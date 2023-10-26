CREATE TABLE IF NOT EXISTS "Counters" (
	"Id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT
);
CREATE TABLE IF NOT EXISTS "Services" (
	"Id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT,
	"AverageServiceTime"  INTEGER
);
CREATE TABLE IF NOT EXISTS "ServicesByCounters" (
	"ServiceId"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"CounterId"	INTEGER 
);

CREATE TABLE IF NOT EXISTS "Tickets" (
	"Number"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"DateTime"	DATE PRIMARY KEY,
    "ServiceId" INTEGER,
    "UserId" INTEGER ,
    "EstimatedWaitingTime" NUMERIC,
    "BeingServed" INTEGER NOT NULL DEFAULT 0 CHECK("BeingServed" IN (0,1)),
	"OfficerId"  INTEGER,
    "CounterId" INTEGER 
);
CREATE TABLE IF NOT EXISTS "Users" (
	"Id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Name"	TEXT,
    "Email" TEXT,
    "Password" TEXT,
    "Role" TEXT,
    "Salt" TEXT
);

INSERT INTO "Users" VALUES (1,'luigi', 'luigi@test.com', 'pwd','officer','salt');



COMMIT;
