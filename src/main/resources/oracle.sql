CREATE TABLE user_info (
  user_idx number(11) NOT NULL ,
  user_register_date date default sysdate,
  user_name varchar(200)  NOT NULL,
  user_social_secunum varchar(200)  DEFAULT NULL,
  user_sex varchar(200)  DEFAULT NULL ,
  user_comp varchar(200)  DEFAULT NULL ,
  user_comp_enterdate date DEFAULT NULL,
  user_dept varchar(200)  DEFAULT NULL ,
  user_spot varchar(200)  DEFAULT NULL ,
  user_army_serv varchar(200)  DEFAULT NULL,
  user_marital_status varchar(200)  DEFAULT NULL,
  user_army_serv_enter date DEFAULT NULL,
  user_army_serv_leave date DEFAULT NULL,
  user_army_serv_period varchar(200)  DEFAULT NULL,
  user_telnum_wired varchar(200)  DEFAULT NULL,
  user_telnum_wireless varchar(200)  DEFAULT NULL,
  user_email varchar(200)  DEFAULT NULL ,
  user_zipcode varchar(200)  DEFAULT NULL,
  user_address varchar(200)  DEFAULT NULL,
  PRIMARY KEY (user_idx)
);

CREATE TABLE user_info_career (
  career_idx number(11) NOT NULL ,
  user_idx number(11) NOT NULL,
  career_comp_name varchar(200) DEFAULT NULL,
  career_enterdate date DEFAULT NULL,
  career_leavedate date DEFAULT NULL,
  career_spot varchar(200) DEFAULT NULL,
  career_responsib varchar(200) DEFAULT NULL,
  PRIMARY KEY (career_idx),
  CONSTRAINT FK_user_info_career FOREIGN key (user_idx)
  REFERENCES user_info(user_idx)
);

CREATE TABLE user_info_edu (
  edu_idx number(11) NOT NULL ,
  user_idx number(11) DEFAULT NULL,
  edu_school_name varchar(200) DEFAULT NULL,
  edu_status varchar(200) DEFAULT NULL,
  edu_year varchar(200) DEFAULT NULL,
  edu_month varchar(200) DEFAULT NULL,
  PRIMARY KEY (edu_idx),
  CONSTRAINT FK_user_info_edu FOREIGN key (user_idx)
  REFERENCES user_info(user_idx)
);

CREATE TABLE user_info_licen (
  licen_idx number(11) NOT NULL ,
  user_idx number(11) DEFAULT NULL,
  licen_name varchar(200) DEFAULT NULL,
  licen_skill_level varchar(200) DEFAULT NULL,
  PRIMARY KEY (licen_idx),
  CONSTRAINT FK_user_info_licen FOREIGN key (user_idx)
  REFERENCES user_info(user_idx)
);

CREATE TABLE user_info_qualifi (
  qualifi_idx number(11) NOT NULL ,
  user_idx number(11) DEFAULT NULL,
  qualifi_name varchar(200) DEFAULT NULL,
  qualifi_getdate date DEFAULT NULL,
  PRIMARY KEY (qualifi_idx),
  CONSTRAINTS FK_user_info_qualifi FOREIGN KEY(user_idx) 
  REFERENCES user_info(user_idx)
);

CREATE TABLE user_info_skill (
  skill_idx number(11) NOT NULL ,
  user_idx number(11) DEFAULT NULL,
  skill_project_name varchar(1000) DEFAULT NULL,
  skill_startdate date DEFAULT NULL,
  skill_enddate date DEFAULT NULL,
  skill_customer_comp varchar(1000) DEFAULT NULL,
  skill_work_comp varchar(1000) DEFAULT NULL,
  skill_applied varchar(1000) DEFAULT NULL,
  skill_industry varchar(1000) DEFAULT NULL,
  skill_role varchar(1000) DEFAULT NULL,
  skill_model varchar(1000) DEFAULT NULL,
  skill_os varchar(1000) DEFAULT NULL,
  skill_lang varchar(1000) DEFAULT NULL,
  skill_dbms varchar(1000) DEFAULT NULL,
  skill_comm varchar(1000) DEFAULT NULL,
  skill_tool varchar(1000) DEFAULT NULL,
  skill_etc varchar(1000) DEFAULT NULL,
  PRIMARY KEY (skill_idx),
  constraint FK_user_info_skill foreign key(user_idx)
  references user_info(user_idx)
);

CREATE TABLE user_info_training (
  training_idx number(11) NOT NULL ,
  user_idx number(11) DEFAULT NULL,
  training_name varchar(200) DEFAULT NULL,
  training_startdate date DEFAULT NULL,
  training_enddate date DEFAULT NULL,
  training_agency varchar(200) DEFAULT NULL,
  PRIMARY KEY (training_idx),
  constraint FK_user_info_training foreign key(user_idx)
  references user_info(user_idx)
);

CREATE TABLE IMAGE(
	img_idx number(11) primary key,
	user_idx number(11),
	img_name varchar(1000),
    CONSTRAINT FK_user_image foreign key(user_idx)
    references user_info(user_idx)
);

CREATE TABLE user_info_hobby (
    hobby_idx number(11) NOT NULL,
    user_idx number(11) DEFAULT NULL,
    hobby_name varchar(200) DEFAULT NULL,
    hobby_continuedate varchar(200) DEFAULT NULL,
    hobby_weektime varchar(200) DEFAULT NULL,
    PRIMARY KEY (hobby_idx),
    constraint FK_user_info_hobby foreign key(user_idx)
    references user_info(user_idx)
);

// round -> 자리수 함수, 반올림 or 버림 선택 가능
// abs -> 절대값 구하는 함수 ex) -15 -> 15
// nvl -> null 일 경우 대체할 값 설정하는 함수
select user_idx
,round(abs(sum((nvl(trunc(career_enterdate),sysdate) - nvl(trunc(career_leavedate),sysdate))/365))) as career_date
from user_info_career
group by user_idx;
            
create sequence user_info_seq;
create sequence user_info_edu_seq;
create sequence user_info_career_seq;
create sequence user_info_licen_seq;
create sequence user_info_qualifi_seq;
create sequence user_info_skill_seq;
create sequence user_info_training_seq;
create sequence img_seq;
create sequence user_info_hobby_seq;
commit;
