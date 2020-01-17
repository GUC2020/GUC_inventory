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
            $('body').append("<div class='"+all[i]+"'><h3>"+all[i]+"</h3></div>");
            for(j = 0; j < data.items.length; j++){
                if(data.items[j].desc === all[i]){
                    $("."+all[i]).append("<p>"+data.items[j].name+"</p><p> quanity: "+data.items[j].quanity+"</p>"+"<p style='display:none'>"+data.items[j].name+"</p><p style='display:none'>"+data.items[j].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
                }
            }
        }
    })
})

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