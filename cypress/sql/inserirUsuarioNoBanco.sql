INSERT INTO bugtracker.mantis_user_table (username,realname,email,enabled,access_level,password,cookie_string)
VALUES ('$username','$realname','$email',1,90,MD5('admin'),'$username')