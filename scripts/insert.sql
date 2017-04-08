use ulbora_challenge;


insert into `language`(`code`) 
values('en_us');

insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('What is greater, 6+3 or 4+3?', '6+3', (select `id` from `language` where `code` = 'en_us'));


insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('Which is the capital of Georgia, Atlanta or Hawaii?', 'Atlanta', (select `id` from `language` where `code` = 'en_us'));



insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('Which is white, a duck or a black cow?', 'duck', (select `id` from `language` where `code` = 'en_us'));


insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('What is less, 3+2 or 4+0?', '4+0', (select `id` from `language` where `code` = 'en_us'));


insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('Who was the first US President, George or Jim?', 'George', (select `id` from `language` where `code` = 'en_us'));



insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('Which was the first US state, Delaware or Atlanta?', 'Delaware', (select `id` from `language` where `code` = 'en_us'));


insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('What is greater, 2+2 or 4+3?', '4+3', (select `id` from `language` where `code` = 'en_us'));


insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('What is less, 2+2 or 4+3?', '2+2', (select `id` from `language` where `code` = 'en_us'));


insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('Which is red, a chicken or a blue car?', 'chicken', (select `id` from `language` where `code` = 'en_us'));



insert into `captcha_not`(`question`, `answer`, `language_id`) 
values('Which is red, a truck or a green house?', 'truck', (select `id` from `language` where `code` = 'en_us'));

