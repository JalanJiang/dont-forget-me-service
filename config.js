module.exports = {
    name: "Don't Forget Me API",
    version: "1.0.0",
    port: process.env.PORT || 8088,
    db: {
        path: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dont_forget",
        port: process.env.MONGODB_PORT || "27017"
    },
    secret: process.env.SECRET || "test_secret",
    salt: process.env.SALT || "1h029kh2lj11jmjxrg13k1c12b"
};