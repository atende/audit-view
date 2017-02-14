CREATE SEQUENCE audit_seq MINVALUE 1 INCREMENT 1;
CREATE TABLE audit_event
(
    id BIGINT PRIMARY KEY DEFAULT nextval('audit_seq') NOT NULL,
    action VARCHAR(200) NOT NULL,
    application_name VARCHAR(50) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    description VARCHAR(255),
    ip VARCHAR(46),
    resource_id VARCHAR(200) NOT NULL,
    resource_type VARCHAR(200) NOT NULL,
    security_level VARCHAR(255),
    user_name VARCHAR(100) NOT NULL
);

insert into audit_event (id, action, application_name, date_time, description, ip, resource_id, resource_type, security_level, user_name) values
    (nextval('audit_seq'), 'ldap_enable', 'TEST', '2017-02-13 10:22:23', 'test description', '10.10.10.1', '1', 'person', 'NORMAL', 'foo' );
insert into audit_event (id, action, application_name, date_time, description, ip, resource_id, resource_type, security_level, user_name) values
    (nextval('audit_seq'), 'ldap_enable', 'TEST', '2017-02-13 12:00:00', 'test description', '10.10.10.1', '2', 'person', 'NORMAL', 'foo' );
insert into audit_event (id, action, application_name, date_time, description, ip, resource_id, resource_type, security_level, user_name) values
    (nextval('audit_seq'), 'ldap_create', 'TEST', '2017-02-14 06:00:00', 'test description', '10.10.10.2', '100', 'person', 'NORMAL', 'bar' );
insert into audit_event (id, action, application_name, date_time, description, ip, resource_id, resource_type, security_level, user_name) values
    (nextval('audit_seq'), 'ldap_remove', 'TEST', '2017-02-14 10:00:00', 'test description', '10.10.10.1', '1', 'person', 'HIGHT', 'foo' );
insert into audit_event (id, action, application_name, date_time, description, ip, resource_id, resource_type, security_level, user_name) values
    (nextval('audit_seq'), 'ldap_enable', 'TEST', '2017-02-14 12:00:00', 'test description', '10.10.10.1', '2', 'person', 'NORMAL', 'foo' );
insert into audit_event (id, action, application_name, date_time, description, ip, resource_id, resource_type, security_level, user_name) values
    (nextval('audit_seq'), 'ldap_change_password', 'TEST', '2017-02-15 12:00:00', 'test description', '10.10.10.2', '3', 'person', 'NORMAL', 'bar' );