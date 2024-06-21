create database employeeManagement


create table if not exists employee 
(
	emp_id varchar(10) not null primary key,
	emp_name varchar(50) not null,
	age int not null,
	email varchar(50) not null unique,
	emp_pass varchar(100) not null,
	mobile_number varchar(20) not null,
	date_of_joining date not null,
	emp_role varchar(50),
	address varchar(500) not null,
	work_id varchar(10),
	mng_id varchar(10),
	adm_id varchar(10),
	constraint work_id  foreign key(work_id) references work_info(work_id),
	constraint mng_id   foreign key(mng_id) references manager(mng_id),
	constraint admin_id   foreign key(adm_id) references admin_man(adm_id)
)


create table if not exists manager
(
	mng_id varchar(10) not null primary key,
	mng_name varchar(50) not null,
	mng_age int not null,
	mng_email varchar(50) not null unique,
	mng_pass varchar(100) not null,
	mng_mobile_number varchar(20) not null,
	mng_date_of_joining date not null,
	mng_logout_time timestamp not null,
	adm_id varchar(10),
	constraint adm_id foreign key(adm_id) references admin_man(adm_id)  
)


create table if not exists work_info
(
	work_id varchar(10) not null primary key,
	work_name varchar(200) not null,
	alloted_time timestamp not null,
	completion_time timestamp not null,
	mng_id varchar(10),
	constraint mng_id foreign key(mng_id) references manager(mng_id)
)

create table if not exists admin_man
(
	adm_id varchar(10) not null primary key,
	adm_name varchar(50) not null,
	adm_age int not null,
	adm_email varchar(50) not null unique,
	adm_pass varchar(100) not null,
	adm_mobile_number varchar(20) not null,
	adm_date_of_joining date not null,
	adm_address varchar(500) not null,
)
select * from admin_man


create table if not exists emp_login_table
(
	login_id varchar(10) not null primary key,
	emp_name varchar(100) not null ,
	login_time timestamp not null,
	logout_time timestamp not null,
	emp_id varchar(10),
	mng_id varchar(10),
	adm_id varchar(10),
	work_id varchar(10),
	constraint emp_id foreign key(emp_id) references employee(emp_id),
	constraint mng_id foreign key(mng_id) references manager(mng_id),
	constraint adm_id foreign key(adm_id) references admin_man(adm_id),
	constraint work_id foreign key(work_id) references work_info(work_id)
)
	
-- alter table admin_man
-- 	drop column adm_login_time,
-- 	drop column adm_logout_time

-- alter table manager
-- 	drop column mng_login_time,
-- 	drop column mng_logout_time

-- alter table employee
-- 	drop column login_time,
-- 	drop column logout_time

	
-- ALTER TABLE admin_man
--     ALTER COLUMN adm_email SET DATA TYPE VARCHAR(50),
--     ALTER COLUMN adm_email SET NOT NULL;

-- ALTER TABLE manager
--     ALTER COLUMN mng_email SET DATA TYPE VARCHAR(50),
--     ALTER COLUMN mng_email SET NOT NULL;

-- ALTER TABLE employee
--     ALTER COLUMN email SET DATA TYPE VARCHAR(50),
--     ALTER COLUMN email SET NOT NULL;

-- ALTER TABLE employee
--     ALTER COLUMN emp_role SET DATA TYPE VARCHAR(50),
--     ALTER COLUMN emp_role SET NOT NULL;

INSERT INTO admin_man (adm_id, adm_name, adm_age, adm_email, adm_pass, adm_mobile_number, adm_date_of_joining, adm_address, adm_login_time, adm_logout_time) VALUES
('A003', 'Alice Johnson', 45, 'alice.johnson@example.com', 'password123', '555-1234', '2015-01-10', '123 Admin St', '2023-01-01 09:00:00', '2023-01-01 17:00:00'),
('A004', 'Bob Smith', 50, 'bob.smith@example.com', 'password456', '555-5678', '2010-06-25', '456 Admin Rd', '2023-01-01 09:00:00', '2023-01-01 17:00:00');

INSERT INTO manager (mng_id, mng_name, mng_age, mng_email, mng_pass, mng_mobile_number, mng_date_of_joining, mng_address, mng_login_time, mng_logout_time, adm_id) VALUES
('M001', 'Carol White', 40, 'carol.white@example.com', 'password789', '555-2345', '2012-03-15', '789 Manager Blvd', '2023-01-01 08:30:00', '2023-01-01 16:30:00', 'A001'),
('M002', 'David Brown', 38, 'david.brown@example.com', 'password101', '555-6789', '2013-07-22', '321 Manager Ln', '2023-01-01 08:30:00', '2023-01-01 16:30:00', 'A002');

select * from manager


INSERT INTO work_info (work_id, work_name, alloted_time, completion_time, mng_id) VALUES
('W001', 'Project Alpha', '2023-01-10 09:00:00', '2023-01-20 17:00:00', 'M001'),
('W002', 'Project Beta', '2023-02-01 09:00:00', '2023-02-15 17:00:00', 'M002');
select * from work_info

	
INSERT INTO employee (emp_id, emp_name, age, email, emp_pass, mobile_number, date_of_joining, emp_role, address, login_time, logout_time, work_id, mng_id, adm_id) VALUES
('E001', 'John Doe', 30, 'john.doe@example.com', 'empPass1', '555-7890', '2022-05-01', 'Developer', '123 Employee St', '2023-06-01 09:00:00', '2023-06-01 17:00:00', 'W001', 'M001', 'A001'),
('E002', 'Jane Smith', 28, 'jane.smith@example.com', 'empPass2', '555-3456', '2021-11-15', 'Tester', '456 Employee Ave', '2023-06-01 09:00:00', '2023-06-01 17:00:00', 'W002', 'M002', 'A002'),
('E003', 'Robert Brown', 35, 'robert.brown@example.com', 'empPass3', '555-9876', '2020-09-20', 'Manager', '789 Employee Blvd', '2023-06-01 09:00:00', '2023-06-01 17:00:00', 'W001', 'M001', 'A001'),
('E004', 'Emily Davis', 32, 'emily.davis@example.com', 'empPass4', '555-6543', '2019-03-05', 'Designer', '321 Employee Ln', '2023-06-01 09:00:00', '2023-06-01 17:00:00', 'W002', 'M002', 'A002');

select * from employee


-- Sequence for emp_id
CREATE SEQUENCE emp_id_seq START 1;

-- Sequence for mng_id
CREATE SEQUENCE mng_id_seq START 1;

-- Sequence for work_id
CREATE SEQUENCE work_id_seq START 1;

-- Sequence for adm_id
CREATE SEQUENCE adm_id_seq START 1;

--sequence for login_id
CREATE SEQUENCE login_id_seq START 1;

--trigger for emp_id generation
CREATE OR REPLACE FUNCTION generate_emp_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.emp_id := 'E' || nextval('emp_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_emp_id
BEFORE INSERT ON employee
FOR EACH ROW
EXECUTE FUNCTION generate_emp_id();


--trigger for mng_id generation
CREATE OR REPLACE FUNCTION generate_mng_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.mng_id := 'M' || nextval('mng_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_mng_id
BEFORE INSERT ON manager
FOR EACH ROW
EXECUTE FUNCTION generate_mng_id();



--trigger for work_id generation
CREATE OR REPLACE FUNCTION generate_work_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.work_id := 'W' || nextval('work_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_work_id
BEFORE INSERT ON work_info
FOR EACH ROW
EXECUTE FUNCTION generate_work_id();


--trigger for adm_id generation
CREATE OR REPLACE FUNCTION generate_adm_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.adm_id := 'A' || nextval('adm_id_seq');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_adm_id
BEFORE INSERT ON admin_man
FOR EACH ROW
EXECUTE FUNCTION generate_adm_id();

