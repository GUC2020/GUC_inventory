$(document).ready(function(){
    
    const name = document.querySelector('#one')
    
    const addForm = document.querySelector('#add')
    const desc = document.querySelector('#desc')
    const nam = document.querySelector('#nam')
    const quan = document.querySelector('#quan')
    const min = document.querySelector('#min')
    const max = document.querySelector('#max')

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
            $(".select_choice").append("<option value='" + all[i] + " item'>" + all[i] + "</option>");
            for(j = 0; j < data.items.length; j++){
                if(data.items[j].desc === all[i]){
                    $(".ind_"+all[i]).append("<div class='info'><p>"+data.items[j].name+" </p><p> quanity: "+data.items[j].quanity+"</p>"+"<p style='display:none'>"+data.items[j].name+"</p><p style='display:none'>"+data.items[j].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form></div>');
                }
            }
            $(".grid_mobile").append("<div class='hide mobile_item_container Mind_" + all[i] + "'></div>")
                for (j = 0; j < data.items.length; j++) {
                    if (data.items[j].desc === all[i]) {
                        $(".Mind_" + all[i]).append("<div class='info'><p>"+data.items[j].name+" </p><p> quanity: "+data.items[j].quanity+"</p>"+"<p style='display:none'>"+data.items[j].name+"</p><p style='display:none'>"+data.items[j].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form></div>');
                    }
                }
        }
        $('.select_choice option').each(function(){
            if($(this).is(':selected')){
                let curr_select = this;
                $('.grid_mobile').children().each(function(){
                    if($(this).hasClass('Mind_'+curr_select.textContent) ){
                     $(this).removeClass('hide')
                    }
                    else{
                     $(this).addClass('hide')
                    }
                })
            }
        })
    })
    
            
        
    


$('.select_choice').change(function(){
    $('.select_type option').each(function(){
        let curr_type = this.textContent;
        if($(this).is(':selected')){
            if(curr_type == 'Stock'){
                $('.select_choice option').each(function(){
                    if($(this).is(':selected')){
                        let curr_select = this;
                        $('.grid_mobile').children().each(function(){
                            if($(this).hasClass('Mind_'+curr_select.textContent) ){
                             $(this).removeClass('hide')
                            }
                            else{
                             $(this).addClass('hide')
                            }
                        })
                    }
                })
            }
            if(curr_type == 'Analytics'){
                $('.grid_mobile').children().each(function(){
                     $(this).addClass('hide');
                     if($(this).hasClass('mobile_container')||$(this).hasClass('mobile_name')){
                         $(this).removeClass('hide');
                     }
                })
            }
        }
    })
    
})



setTimeout(function(){
    var acc = document.getElementsByClassName("item");
    var i;

    for (i = 0; i < acc.length; i++) {
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

setTimeout(function(){
    const updateForm = document.getElementsByClassName('update')
    const quanity = document.getElementsByClassName('two')
    for(let i=0;i<updateForm.length;i++){
        updateForm[i].addEventListener('submit',(e)=>{
            e.preventDefault()
            const name1 = updateForm[i].previousSibling.previousSibling.textContent
            const desc1 = updateForm[i].previousSibling.textContent
            const quanity1 = quanity[i].value
            fetch('/update?name='+name1+'&quanity='+quanity1+'&desc='+desc1).then((response)=>{
                response.json().then((data)=>{
                
                })
                
            })
            const test = updateForm[i].previousSibling.previousSibling.previousSibling
            $(test).text("quanity: " +quanity1)
            $(updateForm[i]).find("input[type=number], textarea").val("")
        })
    }
},1000)



    //resolution changes
    let width = $(window).width();
    if(width <= 768){
        $(' .main-content, .big').addClass('hide');
    }else{
        $('.nav_bar, .select_menu, .grid_mobile').addClass('hide');
    }
    
    $( window ).resize(function() {
        width = $(window).width();
        if(width <= 768){
            $(' .main-content, .big').addClass('hide');
            $('.nav_bar, .select_menu, .grid_mobile').removeClass('hide');
        }
        else{
            $('.main-content, .big').removeClass('hide');
            $('.nav_bar, .select_menu, .grid_mobile').addClass('hide');
        }
    });
})
})