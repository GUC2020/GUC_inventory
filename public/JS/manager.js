$(document).ready(function(){
    //these are to access different elements and create queries 
    const name = document.querySelector('#one')
    const addForm = document.querySelector('#add')
    const desc = document.querySelector('#desc')
    const nam = document.querySelector('#nam')
    const quan = document.querySelector('#quan')
    const min = document.querySelector('#min')
    const max = document.querySelector('#max')

    //scan database and pull/organize information
    fetch('/items').then((response)=>{
        response.json().then((data)=>{
            // console.log(data.items.length)
            for(i = 0; i < data.items.length; i++){
                if(data.items[i].desc == "Sauces"){
                    $('.sauces_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                
                }
                if(data.items[i].desc == "Syrup"){
                    $('.syrup_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                }
                if(data.items[i].desc == "Coffee Beans"){
                    $('.coffee_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups" >Update</button></form></div>');
                }
                if(data.items[i].desc == "Ground Coffee"){
                    $('.ground_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                }
                if(data.items[i].desc == "Tea"){
                    $('.tea_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                }
                if(data.items[i].desc == "Cold Brew Tea"){
                    $('.cold_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                }
                if(data.items[i].desc == "Milk"){
                    $('.milk_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                }
                if(data.items[i].desc == "Fruit"){
                    $('.fruit_contain').append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p><p> min: "+data.items[i].min+"</p><p> max: "+data.items[i].max+ "<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                }
            }
        })
    })

    //settimeout so we can fetch current database info
    
setTimeout(function(){
    
    const updateForm = document.getElementsByClassName('update')
    const quanity = document.getElementsByClassName('two')
    const min = document.getElementsByClassName('three')
    const max = document.getElementsByClassName('four')
    

    //adding event listener to each form for updating
    for(let i=0;i<updateForm.length;i++){
        updateForm[i].addEventListener('submit',(e)=>{
            e.preventDefault()
            // console.log('hi')
            const name1 = updateForm[i].previousSibling.previousSibling.textContent
            const desc1 = updateForm[i].previousSibling.textContent
            let curr_quan = updateForm[i].previousSibling.previousSibling.previousSibling.textContent
            curr_quan = curr_quan.split(" ").pop();
            console.log(curr_quan)
            const quanity1 = quanity[i].value
            const min1 = min[i].value
            const max1 = max[i].value
            if(min1 > Number(curr_quan)){
                return console.log('its a no from me dog')
            }
            if(max1 != ''){
                if(min1 > max1){
                    return console.log('its a no go from me')
                }
            }
            
            console.log(quanity1)
            fetch('/update_full?name='+name1+'&quanity='+quanity1+'&desc='+desc1+'&min='+min1+'&max='+max1).then((response)=>{
                response.json().then((data)=>{
                
                })
                
            })
            const quan_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling.previousSibling
            const min_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling
            const max_chan = updateForm[i].previousSibling.previousSibling.previousSibling
            if(quanity1 != ""){
                $(quan_chan).text("quanity: "+ quanity1)
            }
            if(min1 != ""){
                $(min_chan).text("min: "+ min1)
            }
            if(max1 != ""){
                $(max_chan).text("max: "+ max1)
            }
            // location.reload(true);
        })
        
    }
},1000)



addForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    // console.log('hi')
    const des = desc.value
    const na = nam.value
    const qua = quan.value
    const mi = min.value
    const ma = max.value
    fetch('/create?desc='+des+'&nam='+na+'&quan='+qua+'&min='+mi+'&max='+ma).then((response)=>{
        response.json().then((data)=>{
           
        })
    })
})
setTimeout(function(){
    const curr_delete =  document.getElementsByClassName('delete')
    for (i = 0; i < curr_delete.length;i++){
        $(curr_delete[i]).click(function(){
            const na = this.nextSibling.textContent
            const des = this.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent
            console.log(des)
            fetch('/delete?desc='+des+'&nam='+na).then((response)=>{
                response.json().then((data)=>{ 
                })
            })
        })
    }
},1000)

















//function for updating all of the different forms at once
//goes through all the different forms and clicks their update button
const up_all = ()=>{
        setTimeout(function(){
        const updateForm = document.getElementsByClassName('update')
        const quanity = document.getElementsByClassName('two')
        const min = document.getElementsByClassName('three')
        const max = document.getElementsByClassName('four')
        
        for(let i=0;i<updateForm.length;i++){
            updateForm[i].addEventListener('click',(e)=>{
                e.preventDefault()
                const name1 = updateForm[i].previousSibling.previousSibling.textContent
                const desc1 = updateForm[i].previousSibling.textContent
                let curr_quan = updateForm[i].previousSibling.previousSibling.previousSibling.textContent
                curr_quan = curr_quan.split(" ").pop();
                console.log(curr_quan)
                const quanity1 = quanity[i].value
                const min1 = min[i].value
                const max1 = max[i].value
                if(min1 > Number(curr_quan)){
                    return console.log('its a no from me dog')
                }
                if(max1 != ''){
                    if(min1 > max1){
                        return console.log('its a no go from me')
                    }
                }
                
                console.log(quanity1)
                fetch('/update_full?name='+name1+'&quanity='+quanity1+'&desc='+desc1+'&min='+min1+'&max='+max1)

                const quan_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling.previousSibling
                const min_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling
                const max_chan = updateForm[i].previousSibling.previousSibling.previousSibling
                if(quanity1 != ""){
                    $(quan_chan).text("quanity: "+ quanity1)
                }
                if(min1 != ""){
                    $(min_chan).text("min: "+ min1)
                }
                if(max1 != ""){
                    $(max_chan).text("max: "+ max1)
                }
                
            })
            updateForm[i].click()
        }
        setTimeout(function(){
            location.reload()
        },2000);
       return console.log('done')

        },2000)
    }

//add click for updating all of the forms
setTimeout(function(){
    $('.all_form').click(function(){
        up_all()
    });
},1000)
})