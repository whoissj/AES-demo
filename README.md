# AES-demo

    通过AJAX获取一段加密的数据（假数据）
　　var keyStr = '12345678'; // 一般key为一个字符串

　　加密过程中使用哪种加密方式取决于传入key的类型，否则就会按照AES-256的方式加密。
　　后端加密的时候是按照128bit给的，但是由于是一个字符串，需要先在前端将其转为128bit的才行，使用CryptoJS.enc.Utf8.parse方法将key转为128bit的。
    var key = CryptoJS.enc.Utf8.parse(keyStr);
　　填充模式：后端使用的是PKCS5Padding，PKCS5Padding和PKCS7Padding是一样的，使用时默认就是按照PKCS7Padding。
#　　// 加密
    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    iv:key,                         //除了EBC模式，其他的都要需key的偏移量
    mode: CryptoJS.mode.CBC,        //加密模式
    padding: CryptoJS.pad.Pkcs7     //填充模式
    });

　　由于CryptoJS生成的密文是一个对象，如果直接将其转为字符串是一个Base64编码过的，在encryptedData.ciphertext上的属性转为字符串才是后端需要的格式。
　　var encryptedBase64Str = encryptedData.toString();
    console.log(encryptedBase64Str);
    // 输出：'RJcecVhTqCHHnlibzTypzuDvG8kjWC+ot8JuxWVdLgY='
------------------------------------------------------------------------------------------------
-------------demo中没有这一步，所以直接用上面的字符串解密就行了---------------
    // 需要读取encryptedData上的ciphertext.toString()才能拿到跟Java一样的密文
    var encryptedStr = encryptedData.ciphertext.toString();
    console.log(encryptedStr);
    // 输出：'44971e715853a821c79e589bcd3ca9cee0ef1bc923582fa8b7c26ec5655d2e06'
　　由于加密后的密文为128位的字符串，那么解密时，需要将其转为Base64编码的格式。
    那么就需要先使用方法CryptoJS.enc.Hex.parse转为十六进制，再使用CryptoJS.enc.Base64.stringify将其变为Base64编码的字符串，此时才可以传入CryptoJS.AES.decrypt方法中对其进行解密。
　　// 拿到字符串类型的密文需要先将其用Hex方法parse一下
    var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr);
    // 将密文转为Base64的字符串
    // 只有Base64类型的字符串密文才能对其进行解密
    var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
　　使用转为Base64编码后的字符串即可传入CryptoJS.AES.decrypt方法中进行解密操作。
-------------------------------------------------------------------------------------
#　　// 解密
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
    iv:key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
    });

　　经过CryptoJS解密后，依然是一个对象，将其变成明文就需要按照Utf8格式转为字符串。
　　// 解密后，需要按照Utf8的方式将明文转位字符串
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);