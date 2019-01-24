module.exports = {
    name: "Don't Forget Me API",
    version: "1.0.0",
    app_code: "01", //业务编号
    port: process.env.PORT || 8088,
    db: {
        path: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dont_forget",
        port: process.env.MONGODB_PORT || "27017"
    },
    secret: process.env.SECRET || "test_secret",
    salt: process.env.SALT || "1h029kh2lj11jmjxrg13k1c12b",
    nickname: {
        adjective: ["邪恶的", "胖胖的", "带刀的", "城堡里的", "可爱的", "爱吃的", "喜欢睡觉的", "得了中二病的", "会写代码的", "拥有小黄鸭的", "帅帅的"],
        noun: ["呀哈哈", "林克", "塞尔达", "Android开发", "服务端开发", "米法", "克洛格种子", "盖侬", "猪猪怪"]
    }
};