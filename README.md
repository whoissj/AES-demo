# AES-demo

    

　　
## 加密：

    通过AJAX获取一段加密的数据（假数据）
　　`var keyStr = '12345678'
    // 一般key为一个字符串`
    
    加密过程中使用哪种加密方式取决于传入key的类型，否则就会按照AES-256的方式加密，
    后端加密的时候是按照128bit给的，但是由于是一个字符串，需要先在前端将其转为128bit的才行，
    使用CryptoJS.enc.Utf8.parse方法将key转为128bit的。
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    
　　填充模式：后端使用的是PKCS5Padding，PKCS5Padding和PKCS7Padding是一样的
    使用时默认就是按照PKCS7Padding
    
    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    iv:key,                         //除了EBC模式，其他的都要需key的偏移量
    mode: CryptoJS.mode.CBC,        //加密模式
    padding: CryptoJS.pad.Pkcs7     //填充模式
    });

　　由于CryptoJS生成的密文是一个对象，如果直接将其转为字符串是一个Base64编码过的
    在encryptedData.ciphertext上的属性转为字符串才是后端需要的格式
    
    var encryptedBase64Str = encryptedData.toString();
    console.log(encryptedBase64Str);
    // 输出：'PcPTMiElKHh/eFTawCx0PR+5koZ5V/D++ZKh7wuDqd4kTbmbfTvfV9LkSIjjb4wKZ95cHqD+gFtlxSuL4Q/bvQKcBU4/AMyVv1pze0Ej7/f/J8Lm2dbbqpwe8S56ovc6vhvYgETplwoYD836tPZKLhbAvvg8z0jh0HvXiPgf2E7bY1maewo57QjYUZ736ge8mzP7zB7g4XU2aQ1GLytJSNb7I6VjRZyzbhBDeViaw6M='

## 解密
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    iv:key,                         //除了EBC模式，其他的都要需key的偏移量
    mode: CryptoJS.mode.CBC,        //加密模式
    padding: CryptoJS.pad.Pkcs7     //填充模式
    });

　　经过CryptoJS解密后，依然是一个对象，将其变成明文就需要按照Utf8格式转为字符串。
　　// 解密后，需要按照Utf8的方式将明文转位字符串
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);