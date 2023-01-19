use server_management;

DELETE FROM server_list WHERE id IS NOT NULL;
DELETE FROM history WHERE id IS NOT NULL; 
INSERT INTO history VALUE("15","2022-09-23/16:54:05","30%","12","12.5");

INSERT INTO history VALUE("13","2022-09-23/16:54:05","20%","8","1.5");

INSERT INTO history VALUE("14","2022-09-23/16:54:05","70%","10","15.3");

INSERT INTO history VALUE("2","2022-09-23/16:54:05","17%","2","21.5");

INSERT INTO history VALUE("3","2022-09-23/16:54:05","92%","7","15");



INSERT INTO history VALUE("15","2022-09-23/16:45:05","12%","2","2.2");

INSERT INTO history VALUE("13","2022-09-23/16:45:05","60%","16","12.5");

INSERT INTO history VALUE("14","2022-09-23/16:45:05","12%","30","251.5");

INSERT INTO history VALUE("2","2022-09-23/16:45:05","99%","25","32.2");

INSERT INTO history VALUE("3","2022-09-23/16:45:05","2%","1","12.5");

INSERT INTO server_list VALUE("3","Dachan2","on");

INSERT INTO server_list VALUE("2","Dachan","off");

INSERT INTO server_list VALUE("14","Manso","on");

INSERT INTO server_list VALUE("13","Yeji","off");
INSERT INTO server_list VALUE("15","Yebin","on");


select * from history;
