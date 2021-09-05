function getMD5(body){
    return CryptoJS.MD5(JSON.stringify(body));
}

function getAuthSignature(md5,timeStamp){
    return CryptoJS.HmacSHA256(`POST\n/apps/1261629/events\nauth_key=7b8d0db6b15647f9f79c&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`,"42c235644e7142b07b99");
}

let sendMessage = async function(){
    let body = {data:'{message:"hello world"}',name:"my-event",channel:"my-channel"}
    let timeStamp = Date.now()/1000;
    let md5=getMD5(body);
    let url =`https://cors.bridged.cc/https://api-eu.pusher.com/apps/1261629/events?body_md5=${md5}&auth_version=1.0&auth_key=7b8d0db6b15647f9f79c&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5,timeStamp)}`;
    let req = await fetch(url,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        }
    });
}