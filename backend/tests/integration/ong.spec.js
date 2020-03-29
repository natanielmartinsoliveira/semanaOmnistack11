const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
beforeEach(async () => {
   await connection.migrate.rollback();
   await connection.migrate.latest();
});
afterAll(async () => {
    await connection.destroy();
 });
describe('ong', () => {
    it('should be able to create a new ong', async () => {
        const response = await request(app).post('/ongs').send({
            name : "Associaçao de proteçao ao animais",
            email : "teste@teste.com",
            whatsapp : "00000000000",
            city : "Barra Velha",
            uf : "SC"
            });
            console.log(response.body);
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    });
});