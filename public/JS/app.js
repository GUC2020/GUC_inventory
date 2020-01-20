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
            for(j = 0; j < data.items.length; j++){
                if(data.items[j].desc === all[i]){
                    $(".ind_"+all[i]).append("<div class='info'><p>"+data.items[j].name+"</p><p> quanity: "+data.items[j].quanity+"</p>"+"<p style='display:none'>"+data.items[j].name+"</p><p style='display:none'>"+data.items[j].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form></div>');
                }
            }
        }
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
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        panel = $('.ind_'+ this.textContent).children()
        panel_sib = $('.ind_'+ this.textContent).siblings().children()
        panel_parent = $('.ind_'+ this.textContent)
        panel_pib = $('.ind_'+ this.textContent).siblings()
        console.log(panel)
        for (i=0;i<panel.length;i++){
            if ($(panel).css('max-height') == '0px') {
                console.log('true')
                $(panel_sib).css({'max-height':0})
                $(panel_pib).css({'display':'none'})
                $(panel_parent).css({'display':'inline-flex'})
                $(panel).each(function(){
                    $(this).css({'max-height':panel[i].scrollHeight})
                })
                }else {
                    console.log('false')
                    $(panel_parent).css({'display':'none'})
                    $(panel).css({'max-height':0})
                }
        }
        
  });
}

},2000)

setTimeout(function(){
    console.log('ready')
    const updateForm = document.getElementsByClassName('update')
    const quanity = document.getElementsByClassName('two')
    for(let i=0;i<updateForm.length;i++){
        updateForm[i].addEventListener('submit',(e)=>{
            e.preventDefault()
            // console.log('hi')
            const name1 = updateForm[i].previousSibling.previousSibling.textContent
            const desc1 = updateForm[i].previousSibling.textContent
            console.log(desc1)
            const quanity1 = quanity[i].value
            console.log(quanity1)
            fetch('/update?name='+name1+'&quanity='+quanity1+'&desc='+desc1).then((response)=>{
                response.json().then((data)=>{
                
                })
                
            })
            const test = updateForm[i].previousSibling.previousSibling.previousSibling
            $(test).text("quanity: " +quanity1)
            // location.reload(true);
        })
    }
},1000)

})