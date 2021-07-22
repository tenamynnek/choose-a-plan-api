DROP TABLE IF EXISTS services;
CREATE TABLE services (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL);
INSERT INTO services (name) values ("General"), ("Specialist"), ("Physiotherapy");

DROP TABLE IF EXISTS plans;
CREATE TABLE plans (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR (255) NOT NULL, price INTEGER default 0);
INSERT INTO plans (name, price) values ("Standard Plan", 0), ("Premium Plan", 388);

DROP TABLE IF EXISTS plan_services;
CREATE TABLE `plan_services` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `planId` int(11) NOT NULL,
  `serviceId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `planId` (`planId`),
  KEY `serviceId` (`serviceId`),
  CONSTRAINT `plan_services_ibfk_1` FOREIGN KEY (`planId`) REFERENCES `plans` (`id`),
  CONSTRAINT `plan_services_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`)
);
insert into plan_services (planId, serviceId)
select p.id, s.id from plans p, services s where p.name='Standard Plan' and (s.name='General');
insert into plan_services (planId, serviceId)
select p.id, s.id from plans p, services s where p.name='Premium Plan' and (s.name='General' or s.name='Specialist' or s.name='Physiotherapy');