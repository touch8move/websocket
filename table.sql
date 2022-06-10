use websocket;
create table mytable (
    idx bigint(20) not null auto_increment,
    context varchar(1000) not null default '',
    primary key (idx) using BTREE
)
engine=InnoDB
ROW_FORMAT=DYNAMIC;