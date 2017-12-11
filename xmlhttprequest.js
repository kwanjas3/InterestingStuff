var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest(); // requires npm install xmlhttprequest


xhr.open('get', "https://reqres.in/api/users?page=2");
xhr.send();
xhr.onreadystatechange = ()=>{
    

    if (xhr.readyState == 4){
        console.log(xhr.status);
        if (xhr.status == 200){
            console.log('yay');
            let data = JSON.parse(xhr.responseText);
            console.log(data.page);
        }else {
            console.log('err');
            console.log(xhr.statusText);
        }
  
    }
};
