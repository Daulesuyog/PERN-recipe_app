create table users(
id serial primary key,
name varchar(200) not null,
gmail varchar(200) not null unique,
password varchar(200) not null unique,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


create table recipes(
id serial primary key,
title varchar(200) not null,
instructions  varchar(200) not null,
 ingrediant1 varchar (200),
  ingrediant2 varchar(200),
   ingrediant3 varchar(200),
    ingrediant4 varchar(200),
	qty1 varchar(200),
	qty2 varchar(200),
	qty3 varchar(200),
	qty4 varchar(200),
	imgurl varchar(200),
	user_id integer not null,
	foreign key (user_id) references users(id) on delete cascade,
	  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


create table saved_recipes(
id serial primary key,
recipe_id integer not null,
user_id integer not null,
foreign key (recipe_id) references recipes(id) on delete cascade,
foreign key (user_id )  references users(id) on delete cascade,
 saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(recipe_id, user_id)
);