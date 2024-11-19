import request from 'supertest';
import app from '../apicalls.js';

beforeEach(() => {
    
});

afterEach(() => {
    
});

describe('test GET /data', () => {
    test("Response to GET /data", async () => {
        const response = await request(app).get("/data");
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('test GET /data/:id', () => {
    test("Response to GET /data/1", async () => {
        const expect = { "id": "1", "Firstname": "Jyri", "Surname": "Kemppainen", "Email": "jyri.kemppainen@karelia.fi" };
        const response = await request(app).get("/data/1");
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expected);
    });

    test("test GET with invalid ID", async () => {
        const response = await request(app).get("/data/10");
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ "error": "Record not found" });
    });
});

describe('test POST /data', () => {
    test("Response to POST with valid data", async () => {
        const newUser = { "id": "3", "Firstname": "New", "Surname": "User", "Email": "NewUser@Kaleri.fi" };
        const response = await request(app)
            .post("/data")
            .send(newUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(201);
        expect(response.body).toEqual(newUser);
    });

    test("test POST with duplicate ID", async () => {
        const duplicateUser = { "id": "1", "Firstname": "Duplicate", "Surname": "User", "Email": "duplicateUser@Karelia.fi" };
        const response = await request(app)
            .post("/data")
            .send(duplicateUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(409);
        expect(response.body).toEqual({ "error": "Record already exists" });
    });

    test("test POST with missing fields", async () => {
        const incompleteUser = { "id": "4", "Firstname": "Incomplete" };
        const response = await request(app)
            .post("/data")
            .send(incompleteUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({ "error": "Missing required fields" });
    });
});

describe('Test PUT /data/:id', () => {
    test("Response to PUT update existing data", async () => {
        const updatedUser = { "Firstname": "Updated", "Surname": "User", "Email": "updatedUser@Karelia.fi" };
        const response = await request(app)
            .put("/data/2")
            .send(updatedUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ "id": "2", ...updatedUser });
    });

    test("test PUT create new record if id doesn't exist", async () => {
        const newUser = { "Firstname": "New", "Surname": "User", "Email": "NewUser@Karelia.fi" };
        const response = await request(app)
            .put("/data/10")
            .send(newUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(201);
        expect(response.body).toEqual({ "id": "10", ...newUser });
    });

    test("test PUT with missing fields", async () => {
        const incompleteUser = { "Firstname": "MissingSurname" };
        const response = await request(app)
            .put("/data/1")
            .send(incompleteUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({ "error": "Missing required fields" });
    });
});

describe('Test DELETE /data/:id', () => {
    test("Response to DELETE with valid ID", async () => {
        const response = await request(app)
            .delete("/data/2")
            .set('content-type', 'application/json');
        expect(response.status).toEqual(204);
    });

    test("test DELETE with invalid ID", async () => {
        const response = await request(app)
            .delete("/data/110")
            .set('content-type', 'application/json');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ "error": "Record not found" });
    });
});
