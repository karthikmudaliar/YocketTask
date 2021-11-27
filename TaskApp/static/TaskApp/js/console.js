$(document).on("click", "#login-btn", function() {
    login_function();
});

$(document).on("click", "#sign-up-btn", function() {
    sign_up_function();
});

function login_function() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    if (username.value == "" || !validate_email(username.value)) {
        M.toast({
            "html": "Please enter valid username"
        }, 2000);
        return;
    }
    if (password.value == "") {
        M.toast({
            "html": "Please enter valid password"
        }, 2000);
        return;
    }

    var encrypted_username = EncryptVariable(username.value);
    var encrypted_password = EncryptVariable(password.value)

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
                setTimeout(function() {
                    window.location = "/task/home/";
                }, 2000);

                M.toast({
                    "html": "Welcome, " + response["username"]
                }, 2000);

            } else if(response["status"] == 400) {

                M.toast({
                    "html": response["message"]
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

function sign_up_function() {

    var username = document.getElementById("signup-username");
    var password = document.getElementById("signup-password");
    var confirm_password = document.getElementById("signup-confirm-password");

    if (username.value == "" || !validate_email(username.value)) {
        M.toast({
            "html": "Please enter valid username"
        }, 2000);
        return;
    }
    if (password.value == "" || confirm_password.value == "") {
        M.toast({
            "html": "Please enter valid password"
        }, 2000);
        return;
    }
    if(password.value != confirm_password.value) {
        M.toast({
            "html": "Password not matching"
        }, 2000);
        return;
    }

    var encrypted_username = EncryptVariable(username.value);
    var encrypted_password = EncryptVariable(password.value);
    var encrypted_confirm_password = EncryptVariable(confirm_password.value);

    var json_string = JSON.stringify({
        username: encrypted_username,
        password: encrypted_password,
        confirm_password: encrypted_confirm_password,
    })
    json_string = EncryptVariable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/task/create-user/", false);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response["status"] == 200) {

                setTimeout(function() {
                    window.location = "/task/login/";
                }, 2000);

                M.toast({
                    "html": "User created Successfully! Please Login!"
                }, 2000);

            } else {

                M.toast({
                    "html": response["message"]
                }, 2000);
            }
        }
    }
    xhttp.send(params);
}

function add_task() {

    var task_name = document.getElementById("task-name").value;
    var task_deadline = document.getElementById("task-deadline").value;
    var task_priority = document.getElementById("task-priority").value;
    var is_task_complete = document.getElementById("is-task-complete").checked;
    var bucket_id = document.getElementById("task-bucket").value;

    if(task_name == "") {
        M.toast({
            "html": "Please enter task name"
        }, 2000);
        return;        
    }

    var json_string = JSON.stringify({
        task_name: task_name,
        task_deadline: task_deadline,
        task_priority: task_priority,
        is_task_complete: is_task_complete,
        bucket_id: bucket_id, 
    })
    json_string = EncryptVariable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/task/add-task/", false);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response["status"] == 200) {

                setTimeout(function() {
                    window.location = "/task/home/";
                }, 2000);

                alert("Task created Successfully");

            } else {

                alert(response["message"]);
            }
        }
    }
    xhttp.send(params);

}

function edit_task(task_id) {

    var task_name = document.getElementById("task-name-"+task_id).value;
    var task_deadline = document.getElementById("task-deadline-"+task_id).value;
    var task_priority = document.getElementById("task-priority-"+task_id).value;
    var is_task_complete = document.getElementById("is-task-complete-"+task_id).checked;
    var bucket_id = document.getElementById("task-bucket-"+task_id).value;

    if(task_name == "") {
        M.toast({
            "html": "Please enter task name"
        }, 2000);
        return;        
    }

    var json_string = JSON.stringify({
        task_id: task_id,
        task_name: task_name,
        task_deadline: task_deadline,
        task_priority: task_priority,
        is_task_complete: is_task_complete,
        bucket_id: bucket_id, 
    })
    json_string = EncryptVariable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/task/edit-task/", false);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response["status"] == 200) {

                setTimeout(function() {
                    window.location = "/task/home/";
                }, 2000);

                alert("Task Edited Successfully");

            } else {

                alert(response["message"]);
            }
        }
    }
    xhttp.send(params);

}

function delete_task(task_id) {

    var json_string = JSON.stringify({
        task_id: task_id,
    })
    json_string = EncryptVariable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/task/delete-task/", false);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response["status"] == 200) {

                setTimeout(function() {
                    window.location = "/task/home/";
                }, 2000);

                alert("Task Deleted Successfully");

            } else {

                alert(response["message"]);
            }
        }
    }
    xhttp.send(params);

}

function create_bucket() {

    var bucket_name = document.getElementById("bucket-name").value;

    if(bucket_name == "") {
        M.toast({
            "html": "Please enter bucket name"
        }, 2000);
        return;        
    }

    var json_string = JSON.stringify({
        bucket_name: bucket_name,
    })
    json_string = EncryptVariable(json_string);
    json_string = encodeURIComponent(json_string);

    var xhttp = new XMLHttpRequest();
    var params = 'json_string=' + json_string
    xhttp.open("POST", "/task/create-bucket/", false);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            response = custom_decrypt(response)
            response = JSON.parse(response);

            if (response["status"] == 200) {

                setTimeout(function() {
                    window.location = "/task/home/";
                }, 2000);

                alert("Bucket Created Successfully");

            } else {

                alert(response["message"]);
            }
        }
    }
    xhttp.send(params);   

}

function open_add_task_modal() {
    $("#add-task-modal").modal('open');
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

/////////////////////////////// Utility Functions //////////////////////////

function validate_email(email_id) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (regex.test(email_id)) {
        return true;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////