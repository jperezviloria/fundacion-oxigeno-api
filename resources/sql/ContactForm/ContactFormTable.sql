CREATE TABLE ContactForm(
	id SERIAL,
	name VARCHAR(100),
	email VARCHAR(80),
	phone VARCHAR(300),
	description VARCHAR(1000),
	country VARCHAR(80),
	dates TIMESTAMP,
	enable Bool,
	PRIMARY KEY(id)
);
