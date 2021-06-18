CREATE TABLE Rol(
	id SERIAL,
	rol VARCHAR(50),
	PRIMARY KEY(id)
);
CREATE TABLE ContactForm(
	id SERIAL,
	name VARCHAR(100),
	email VARCHAR(80),
	phone VARCHAR(300),
	description VARCHAR(2000),
	country VARCHAR(80),
	dates TIMESTAMP,
	enable Bool,
	PRIMARY KEY(id)
);

CREATE TABLE Users(
	id SERIAL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(200) NOT NULL,
	name VARCHAR(80),
	surname VARCHAR(80),
	idRol INT NOT NULL,
	urlImage VARCHAR(300),
	publicId VARCHAR(200),
	enable BOOL NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (idRol) REFERENCES Rol (id)
);

CREATE TABLE events(
	id SERIAL,
	title VARCHAR(200) NOT NULL,
	description VARCHAR(3000) ,
	dates timestamp,
	enable BOOL NOT NULL,
	imageUrl VARCHAR(300),
	publicId VARCHAR(200),
	PRIMARY KEY(id)
);

CREATE TABLE eventyoutube(
	id SERIAL,
	name VARCHAR(200) ,
	idEvent INT,
	link VARCHAR(300),
	position INT,
	PRIMARY KEY(id),
	FOREIGN KEY (idEvent) REFERENCES events(id)
);

INSERT INTO rol (rol) VALUES ('superadmin');
INSERT INTO rol (rol) VALUES ('admin');
SELECT * FROM users;