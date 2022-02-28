const supertest = require('supertest');
const {
    performance
} = require("perf_hooks");
const request = supertest('https://swapi.dev/api/');
var chai = require('chai');
var fs = require('fs');
const expect = chai.expect;
const nock = require('nock');
chai.use(require('chai-json-schema'));
describe('Test /planets/:id', () => {
    it('Verify response headers', async () => {
        const res = await
        request.get(`planets/3`)
        expect(res.headers["content-type"]).to.eq("application/json");
        expect(res.status).to.eq(200);
        expect(res.headers["vary"]).to.eq("Accept, Cookie");
        expect(res.headers["allow"]).to.eq("GET, HEAD, OPTIONS");
    });

    it('Verify response data', async () => {
        const res = await
        request.get(`planets/3`);
        expect(res.body.name).to.eq("Yavin IV");
        expect(res.body.rotation_period).to.eq('24');
        expect(res.body.orbital_period).to.eq('4818');
        expect(res.body.diameter).to.eq('10200');
        expect(res.body.gravity).to.eq("1 standard");
        expect(res.body.terrain).to.eq("jungle, rainforests");
        expect(res.body.surface_water).to.eq('8');
        expect(res.body.population).to.eq('1000');
        expect(res.body.residents[0]).to.eq();
        expect(res.body.films[0]).to.eq("https://swapi.dev/api/films/1/");
        expect(res.body.created).to.eq("2014-12-10T11:37:19.144000Z");
        expect(res.body.edited).to.eq("2014-12-20T20:58:18.421000Z");
        expect(res.body.url).to.eq("https://swapi.dev/api/planets/3/");
    });

    it('Verify the json schema', async () => {
        const res = await
        request.get(`planets/3`);
        var resSchema = {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "rotation_period": {
                    "type": "string"
                },
                "orbital_period": {
                    "type": "string"
                },
                "diameter": {
                    "type": "string"
                },
                "climate": {
                    "type": "string"
                },
                "gravity": {
                    "type": "string"
                },
                "terrain": {
                    "type": "string"
                },
                "surface_water": {
                    "type": "string"
                },
                "population": {
                    "type": "string"
                },
                "residents": {
                    "type": "array",
                    "items": {}
                },
                "films": {
                    "type": "array",
                    "items": [{
                        "type": "string"
                    }]
                },
                "created": {
                    "type": "string"
                },
                "edited": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            },
            "required": [
                "name",
                "rotation_period",
                "orbital_period",
                "diameter",
                "climate",
                "gravity",
                "terrain",
                "surface_water",
                "population",
                "residents",
                "films",
                "created",
                "edited",
                "url"
            ]
        };
        expect(res.body).to.be.jsonSchema(resSchema);
    });
    it('Verify response timeout', async () => {
        const t0 = performance.now();
        const res = await
        request.get(`planets/3`)
        const t1 = performance.now();
        timediff = t1 - t0;
        expect(timediff).to.not.be.greaterThan(3)
    });

    it('Negative test', async () => { 
        const userData = {
            name: "Automated testing",
            Completed: true
        };
        const res = await request
            .post('planets/3')
            .send(userData)
        expect(res.text).to.eq('{"detail":"Method \'POST\' not allowed."}');
    });

    it('Mock test', () => {
        const mockapi = nock("https://swapi.dev/api/");
        mockapi.get('/planets/3/')
            .reply(200, {
                name: 'Sonia John'
            });

    });

})