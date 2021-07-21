DROP TABLE IF EXISTS services;
CREATE TABLE services (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL);
INSERT INTO services (name) values ("General"), ("Specialist"), ("Physiotherapy");

DROP TABLE IF EXISTS plans;
CREATE TABLE plans (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR (255) NOT NULL, price INTEGER default 0);
INSERT INTO plans (name, price) values ("Standard Plan", 0), ("Premium Plan", 388);

DROP TABLE IF EXISTS plan_services;
CREATE TABLE `plan_services` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plan_id` (`plan_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `plan_services_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`),
  CONSTRAINT `plan_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
);
insert into plan_services (plan_id, service_id)
select p.id, s.id from plans p, services s where p.name='Standard Plan' and (s.name='General');
insert into plan_services (plan_id, service_id)
select p.id, s.id from plans p, services s where p.name='Premium Plan' and (s.name='General' or s.name='Specialist' or s.name='Physiotherapy');