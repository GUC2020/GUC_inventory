

$(document).ready(function(){
    fetch('/users').then((response)=>{
        response.json().then((data)=>{
            user_object_array = data.user
            console.log(user_object_array)
            for(i=0;i<user_object_array.length;i++){
                if(user_object_array[i].admin == true){
                    $('.admins').append("<div><div>"+user_object_array[i].name+"</div></div>")
                }else{
                    $('.normal').append("<div><div>"+user_object_array[i].name+"</div></div>")
                }
            }
        }).catch((error)=>{
            console.log(error)
        })
    }).catch((error)=>{
        console.log(error)
    })





});