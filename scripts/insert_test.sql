use ulbora_challenge_test;


insert into `language`(`code`) 
values('en_us');

insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('What is greater, 6+3 or 4+3?', '6+3', (select `id` from `language` where `code` = 'en_us'));

