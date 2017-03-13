/**
 * Created by jun on 2017/3/13.
 */
$(function () {
    var keyStr = '1234567812345678'; // 一般key为一个字符串
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    /*加密*/
    /*var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
     iv:key,
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
     });
     var encryptedBase64Str = encryptedData.toString();
     console.log(encryptedBase64Str);*/
    $('tbody>tr:odd').addClass('odd');
    $('tbody>tr:even').addClass('even');
    $('#search').click(function () {
            $.ajax({
                type:'GET',
                url:'api',
                dataType:"json",
                success:function (res) {
                    if(res.data) {
                        console.log(res.data);
                        var encryptedData = res.data;
                        var decrypted_data = CryptoJS.AES.decrypt(encryptedData, key, {
                            iv: key,    //iv为key的偏移量，例子中跟key使用相同的字符串
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7
                        });
                        console.log(decrypted_data);
                        var decryptedStr = decrypted_data.toString(CryptoJS.enc.Utf8);
                        console.log(decryptedStr);
                        var message = JSON.parse(decryptedStr)[0];
                         console.log(message);
                         $('#phone').html(message.PHONETEL);
                         $('#register-date').html(message.REGISTDATE);
                         $('#trans-date').html(message.TRANSDATE);
                         $('#project-name').html(message.PROJECTNAME);
                         $('#loan-term').html(message.LOANTERM) ;
                         $('#loan-rate').html(message.LOANRATE);
                         $('#amount').html(message.AMOUNT);
                         $('#download').css('visibility','visible')
                         .click(function () {
                         tableExport('table', 'download', 'xls')
                         });
                    }
                },
                error:function (res) {
                    console.log('error')
                }
            })
    });
});