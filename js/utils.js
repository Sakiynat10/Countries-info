function getData(url){
    return new Promise((resolve , reject)=> {
        const xhr = new XMLHttpRequest();

        xhr.open('GET' , url);

        xhr.send();
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const res = JSON.parse(xhr.response);
                    resolve(res)
                }else{
                    reject("Error")
                }
            }
        }
    })
}


// getData('ap-countries-api.vercel.app/all');