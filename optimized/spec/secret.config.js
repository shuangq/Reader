/**
 * Dummy configs for development, should not be used in production.
 */
var users = [{
    Email: 'test@test.com',
    Password: 'test',
    FirstName: 'Test',
    SurName: 'User',
}, {
    Email: 'panda@panda.com',
    Password: 'panda',
    FirstName: 'Pan',
    SurName: 'Da',
}];
var saltRounds = 9;
var secret = 'test123';

module.exports = {
    saltRounds: saltRounds,
    users: users,
    secret: secret,
};
