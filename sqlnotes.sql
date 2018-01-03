create table student(
STUDID number(4) CONStraint STUDENT_PK primary key,
lastname varchar(15) not null,
firstname varchar(15) not null,
grade varchar(1) not null

constraint grade_ck 
check (grade in('A', 'B','C','D','F'))
);

alter table student
drop constraint grade_ck;

alter table student
drop column grade;

insert into student
values(1234, 'kwan', 'jason', 'J');

select * from student;

desc student;

create table course(
courseid varchar2(6) constraint course_PK primary key,
coursedesc varchar2(100),
section varchar2(3) not null
);

drop table course;

create table enrolled_in(
studid number(4) constraint enrolled_in_STUDID_FK references student(studid),
courseid varchar2(6) constraint enrolled_in_CID_FK references course(courseid),
grade varchar2(1) constraint enrolled_in_grade_ck check(
grade in ('A','B','C','D','F'))
);

desc enrolled_in;

create sequence student_studid_seq
    increment by 10
    start with 1000
    maxvalue 9999
    nocache
    nocycle;
    
insert into student 
values (student_studid_seq.nextval, 'kwan', 'jason' );

select * from student;

alter table enrolled_in
drop constraint enrolled_in_grade_ck;

alter table enrolled_in
add constraint enrolled_in_grade_ck check(grade in('A', 'B'));

alter table enrolled_in
drop column grade;

alter table enrolled_in
add grade varchar2(1) default null;

desc enrolled_in;

update student
set lastname = 'quan'
where firstname = 'jason';

select * from student;
