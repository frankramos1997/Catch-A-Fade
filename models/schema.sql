use `j1g7th6052u9xn7r`;

create table barber_log(
    id int not null auto_increment,
    image varchar(50),
    name varchar(50),
    phone_number varchar(12),
    car varchar(50),
    licence_plate varchar(10),
    rating float(3,2),
    primary key (id)

);



create table customer_log(
    id int not null auto_increment,
    name varchar(50),
    phone_number varchar(12),
    rating float(3,2),
    primary key (id)

);

create table appointments(
	customer_id int,
    barber_id int,
    id int not null auto_increment,
    location varchar(30),
    phone_number varchar(12),
    date_time datetime,
    foreign key (customer_id) references customer_log(id),
    foreign key (barber_id) references barber_log(id), 
    primary key(id)


);