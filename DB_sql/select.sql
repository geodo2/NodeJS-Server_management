use server_management;


select * from server_list;

select * from history;

SELECT DISTINCT server_list.id, server_list.name, time, cpu_usage,user_num,state FROM server_list 
LEFT JOIN 
(SELECT * FROM history AS A , (SELECT id AS C_id, MAX(time) as max_time FROM history AS C GROUP BY id) AS B WHERE A.id = C_id AND A.time=B.max_time) AS K 
ON server_list.id=K.id;


/*
SELECT * FROM history AS A,(SELECT id, MAX(time) as max_time FROM history GROUP BY id) AS B WHERE A.id = B.id AND A.time=B.max_time ORDER BY A.id
*/