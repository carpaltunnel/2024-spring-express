import bcrypt from 'bcryptjs';

const password = 'test';

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log(`hash = "${hash}", salt = "${salt}"`);

/*
const previousHash = '$2a$10$vYP0.snzQpwuU./zy2PWNu8Q8f4vEkbnd6YPQWhLpGpVw/xhdWM2S';
const result = bcrypt.compareSync(password, previousHash);
console.log(`Result of comparison is : ${result}`);
*/
