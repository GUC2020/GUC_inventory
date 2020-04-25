

$(document).ready(function(){
    fetch('/users').then((response)=>{
        response.json().then((data)=>{
            user_object_array = data.user
            console.log(user_object_array)
            for(i=0;i<user_object_array.length;i++){
                if(user_object_array[i].admin == true){
                    $('.admins').append("<div class='user'><div class='close'></div><div class='name'>"+user_object_array[i].name+"</div></div>")
                }else{
                    $('.normal').append("<div class='user'><div class='close'></div><div class='name'>"+user_object_array[i].name+"</div></div>")
                }
            }
            $('.close').click(function(){
                $('.delete_form').fadeIn().append('<p>Are you sure you would like to delete <span>'+$(this).siblings().text()+'?</span></p><div class="answer"><button class="yes">Yes</button><button class="no">No</button></div>')
                let close = $(this).siblings().text()
                let full = $(this).parent()
                $('.yes').click(function(){
                    fetch('/delete_user?name='+close).then((response)=>{
                       
                    })
                    $('.delete_form').fadeOut().empty()
                    full.remove()
                })
                $('.no').click(function(){
                    $('.delete_form').fadeOut().empty()
                    full.remove()
                })
            })
        }).catch((error)=>{
            console.log(error)
        })
    }).catch((error)=>{
        console.log(error)
    })})