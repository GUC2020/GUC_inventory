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
            var all = []
            for(i = 0; i < data.items.length; i++){
                all.push(data.items[i].desc)
            }
            const all_set = new Set(all);
            all = [...all_set]
            for(i=0; i < all.length;i++){
                $(".options").append("<div class='"+all[i]+" item'><h3>"+all[i]+"</h3></div>");
                $(".grid").append("<div class='item_container ind_"+all[i]+"'></div>")
                for(j = 0; j < data.items.length; j++){
                    if(data.items[j].desc === all[i]){
                        $(".ind_"+all[i]).append("<div class='info'><div class='delete'>X</div><p>"+data.items[j].name+" </p><p> quanity: "+data.items[j].quanity+"</p><p>min: "+data.items[j].min+"</p><p>max: "+data.items[j].max+"</p><p style='display:none'>"+data.items[j].name+"</p><p style='display:none'>"+data.items[j].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                    }
                }
            }
            // for(i=0; i < all.length;i++){
            //     $('.start').after("<h3>"+all[i]+"</h3><div class='"+all[i]+"_contain'></div>");
            //     for(j = 0; j < data.items.length; j++){
            //         if(data.items[j].desc === all[i]){
            //             $("."+all[i]+"_contain").append("<div class='contain'>"+"<div class='delete'>X</div>"+"<p class='name'>"+data.items[j].name+"</p><p> quanity: "+data.items[j].quanity+"</p><p> min: "+data.items[j].min+"</p><p> max: "+data.items[j].max+ "<p style='display:none'>"+data.items[j].name+"</p><p style='display:none'>"+data.items[j].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
            //         }
            //     }
            // }
            
        })
    })
    setTimeout(function(){
        var acc = document.getElementsByClassName("item");
        var i;
    
        for (i = 0; i < acc.length; i++) {
            console.log('added')
            acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            if($(this).hasClass('.active')){
            }else{
                $(this).addClass('active')
            }
            $(this).siblings().removeClass('active')
            /* Toggle between hiding and showing the active panel */
            panel = $('.ind_'+ this.textContent).children()
            panel_sib = $('.ind_'+ this.textContent).siblings().children()
            panel_parent = $('.ind_'+ this.textContent)
            panel_pib = $('.ind_'+ this.textContent).siblings()
            for (i=0;i<panel.length;i++){
                if ($(panel).css('max-height') == '0px') {
                    $(panel_sib).css({'max-height':0})
                    $(panel_pib).css({'display':'none'})
                    $(panel_parent).css({'display':'inline-flex'})
                    $(panel).each(function(){
                        $(this).css({'max-height':panel[i].scrollHeight})
                    })
                    }
            }
            
      });
    }
},2000)

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
            console.log($(this).parent())
            $(this).parent().css({'max-height':0})
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