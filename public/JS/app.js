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
        // console.log(data.items.length)
        for(i = 0; i < data.items.length; i++){
            if(data.items[i].desc == "Sauces"){
                $('.sauces').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
            if(data.items[i].desc == "Syrup"){
                $('.syrup').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
            if(data.items[i].desc == "Coffee Beans"){
                $('.coffee_beans').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
            if(data.items[i].desc == "Ground Coffee"){
                $('.ground_coffee').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
            if(data.items[i].desc == "Tea"){
                $('.tea').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
            if(data.items[i].desc == "Cold Brew Tea"){
                $('.cold_brew').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
            if(data.items[i].desc == "Milk"){
                $('.milk').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
            if(data.items[i].desc == "Fruit"){
                $('.fruit').after("<p>"+data.items[i].name+"</p><p> quanity: "+data.items[i].quanity+"</p>"+"<p style='display:none'>"+data.items[i].name+"</p><p style='display:none'>"+data.items[i].desc+'<form class="update"> <input class="two"type="number"placeholder="quantity"><button>Update</button></form>');
            }
        }
    })
})

setTimeout(function(){
    console.log('ready')
    const updateForm = document.getElementsByClassName('update')
    const quanity = document.getElementsByClassName('two')
    console.log(updateForm)
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