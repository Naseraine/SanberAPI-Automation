import request from 'supertest';
import {expect} from 'chai';
const baseUrl = 'https://kasir-api.zelz.my.id';

let accessToken;
let refreshToken;

describe("Login", () => {
    it('Positive - Login to get token', async () => {
        const response = await request(baseUrl) //base url
            .post("/authentications") //endpoint
            .send(  {
                    "email": "toko_naser@gmail.com",
                    "password": "toko_naser123"  
                    }
            );

        //Assertion pake chai
        expect((await response).status).to.equal(201);
        accessToken =(await response).body.data.accessToken
        refreshToken =(await response).body.data.refreshToken
        console.log(await response.body);
        console.log("accessToken : ",accessToken);
        console.log("refreshToken : ",refreshToken);

    }).timeout(10000);
});

describe("Get User List", () => {
    it('Positive - Melihat daftar akun admin aktif', async () => {
        const response = await request(baseUrl) //base url
        .get("/users") //endpoint
        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(200);
        expect(await response.body.status).to.equal("success");
        
    })
});



describe("Create User", () => {
    it('Positive - Membuat User admin baru', async () => {
        function generateRandomEmail() {
            const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
            let email = '';
            for (let i = 0; i < 10; i++) {
                email += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return `${email}@gmail.com`;
        }
        const randomEmail = generateRandomEmail();
        const response = await request(baseUrl) //base url
            .post("/users") //endpoint
            .send(  
                    {
                        "name": "admin_naser101",
                        "email": randomEmail,
                        "password": "admin_naser101"
                    }
                 
            )

        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(201);
        expect(await response.body.status).to.equal("success");
        expect(await response.body.message).to.equal("User berhasil ditambahkan");
       
        
    })
});

describe("Get Customer List", () => {
    it('Positive - Melihat data pelanggan yang terdaftar', async () => {
        const response = await request(baseUrl) //base url
        .get("/customers") //endpoint
        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(200);
        expect(await response.body.status).to.equal("success");
        
    })
});

describe("Create Customer", () => {
    it('Positive - Membuat pelanggan baru', async () => {
        function generateRandomusername() {
            const characters = 'abcdefghijklmnopqrstuvwxyz';
            let username = '';
            for (let i = 0; i < 10; i++) {
                username += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return `${username}`;
        }
        function generateRandomphone() {
            const numcharacters = '1234567890';
            let userphone = '';
            for (let i = 0; i < 10; i++) {
                userphone += numcharacters.charAt(Math.floor(Math.random() * numcharacters.length));
            }
            return `0${userphone}`;
        }
        const randomuserphone = generateRandomphone();
        const randomusername = generateRandomusername();
        const response = await request(baseUrl) //base url
            .post("/customers") //endpoint
            .send(  
                    {
                        "name": randomusername,
                        "phone": randomuserphone,
                        "address": "Bintaro",
                        "description": "Customer Umum"
                 
                    }
                 
            )

        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(201);
        expect(await response.body.status).to.equal("success");
        expect(await response.body.message).to.equal("Customer berhasil ditambahkan");
       
        
    })
});


describe("Get Category List", () => {
    it('Positive - Melihat daftar kategori', async () => {
        const response = await request(baseUrl) //base url
        .get("/categories") //endpoint
        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(200);
        expect(await response.body.status).to.equal("success");
        
    })
});

describe("Add New Category", () => {
    it('Positive - Menambahkan kategori baru', async () => {
        const response = await request(baseUrl) //base url
        .post("/categories") //endpoint
        .send(  
            {
                "name": "Minuman Sachet",
                "description": "Minuman Instant berbentuk bubuk"
         
            }
         
        )
        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(201);
        expect(await response.body.status).to.equal("success");
        expect(await response.body.message).to.equal("Category berhasil ditambahkan");
        
    })
});



describe("Get Product List", () => {
    it('Positive - Melihat daftar product', async () => {
        const response = await request(baseUrl) //base url
        .get("/products") //endpoint
        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(200);
        expect(await response.body.status).to.equal("success");
        
    })
});

describe("Add New Product", () => {
    it('Positive - Menambahkan produk baru', async () => {
        const response = await request(baseUrl) //base url
        .post("/products") //endpoint
        .send(  
            {
                "category_id" : "46d9cb65-fb3e-4a3f-a965-7fbf1da6dcd1",
                "code": "X098X01",
                "name": "Makanan Mahal001",
                "price": "12000",
                "cost": "10000",
                "stock": "1"
             }
         
        )
        //Assertion pake chai
        .set("Authorization",`Bearer ${accessToken}`);
        console.log(await response.body);
        expect(await response.status).to.equal(201);
        expect(await response.body.status).to.equal("success");
        expect(await response.body.message).to.equal("Product berhasil ditambahkan");
        
    })
});