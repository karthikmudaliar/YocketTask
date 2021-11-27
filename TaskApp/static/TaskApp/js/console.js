$(document).on("click", "#login-btn", function() {
    login_function();
});

function login_function() {
    username = document.getElementById("username");
    password = document.getElementById("password");

    if (username.value == "") {
        alert("Please enter valid username");
        return;
    }
    if (password.value == "") {
        alert("Please enter valid password");
        return;
    }

    encrypted_username = EncryptVariable(username.value);
    encrypted_password = EncryptVariable(password.value)

    var json_string = JSON.stringify({
        username: encrypted_username,
        password: encrypted_password,
    })
    json_string = EncryptVariable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/task/authentication/", false);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response["status"] == 200) {

                M.toast({
                    "html": "Welcome, " + message["username"]
                }, 2000);

            } else {

                username.value = "";
                password.value = "";
                username.focus()

                M.toast({
                    "html": response["message"]
                }, 2000);
            }
        }
    }
    xhttp.send(params);

}

/////////////////////////////// Encryption And Decription //////////////////////////

function CustomEncrypt(msgString, key) {
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(msgString, CryptoJS.enc.Utf8.parse(key), {
        iv: iv
    });
    var return_value = key;
    return_value += "." + encrypted.toString();
    return_value += "." + CryptoJS.enc.Base64.stringify(iv);
    return return_value;
}

function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function EncryptVariable(data) {

    utf_data = CryptoJS.enc.Utf8.parse(data);
    encoded_data = utf_data;
    random_key = generateRandomString(16);
    encrypted_data = CustomEncrypt(encoded_data, random_key);

    return encrypted_data;
}


function custom_decrypt(msg_string) {

    var payload = msg_string.split(".");
    var key = payload[0];
    var decrypted_data = payload[1];
    var decrypted = CryptoJS.AES.decrypt(decrypted_data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Base64.parse(payload[2])
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

////////////////////////////////////////////////////////////////////////////////////