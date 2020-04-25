//displays the wrong information at the wrong time when fetching charts


$(document).ready(function () {
    //these are to access different elements and create queries 
    const name = document.querySelector('#one')
    const addForm = document.querySelector('#add')
    const desc = document.querySelector('#desc')
    const nam = document.querySelector('#nam')
    const quan = document.querySelector('#quan')
    const min = document.querySelector('#min')
    const max = document.querySelector('#max')
    let all_items = []
    let all_chart = []
    //scan database and pull/organize information
    fetch('/items').then((response) => {
        response.json().then((data) => {
            for (i = 0; i < data.items.length; i++) {
                all_items.push(data.items[i])
            }

            var all = []
            for (i = 0; i < data.items.length; i++) {
                all.push(data.items[i].desc)
            }
            const all_set = new Set(all);
            all = [...all_set]
            for (i = 0; i < all.length; i++) {
                $(".type").append("<option value='" + all[i] + "'>" + all[i] + "</option>");
                $(".options").append("<div class='" + all[i] + " item'><h3>" + all[i] + "</h3></div>");
                $(".select_choice").append("<option value='" + all[i] + " item'>" + all[i] + "</option>");
                $(".grid").append("<div class='item_container ind_" + all[i] + "'></div>")
                for (j = 0; j < data.items.length; j++) {
                    if (data.items[j].desc === all[i]) {
                        $(".ind_" + all[i]).append("<div class='info'><div class='delete'>X</div><p>" + data.items[j].name + " </p><p> quanity: " + data.items[j].quanity + "</p><p>min: " + data.items[j].min + "</p><p>max: " + data.items[j].max + "</p><p style='display:none'>" + data.items[j].name + "</p><p style='display:none'>" + data.items[j].desc + '<form class="update"> <input class="two"type="number"placeholder="quantity"><input class="three"type="number"placeholder="min"><input class="four"type="number"placeholder="max"><button class="ups">Update</button></form></div>');
                    }
                }

                $(".grid_mobile").append("<div class='hide mobile_item_container Mind_" + all[i] + "'></div>")
                for (j = 0; j < data.items.length; j++) {
                    if (data.items[j].desc === all[i]) {
                        $(".Mind_" + all[i]).append("<div class='mobile_info'><p>" + data.items[j].name + " </p> " +  '<form class="mobile_update"> <label for="mobile_quanity"class="two_lab">Quanity:    </label><input id="mobile_quanity"class="twoM mob_in"type="number"placeholder="'+data.items[j].quanity +'"><label for="mobile_min" class="three_lab">Min: </label><input class="threeM mob_in"type="number"placeholder="'+data.items[j].min+'"><label for="mobile_max"class="four_lab">Max: </label><input class="fourM mob_in"type="number"placeholder="'+data.items[j].max+'"><button class="ups">Update</button></form></div>');
                    }
                }
            }
            $('.select_type option').each(function(){
                let curr_type = this.textContent;
                console.log(curr_type)
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
            })

            $('.select_type').change(function(){
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








            let selected_option = $('.type option:selected')
            for (j = 0; j < all_items.length; j++) {
                if (all_items[j].desc == selected_option[0].label) {
                    $(".name , .mobile_name").append("<option value='" + all_items[j].name + "'>" + all_items[j].name + "</option>");
                }
            }
            fetch('/chart').then((response) => {
                response.json().then((data) => {
                        
                    
                    let selected_name = $('.name option:selected')
                    for(i=0;i<data.chart.length;i++){
                        if(data.chart[i].name==selected_name[0].label && data.chart[i].desc==selected_option[0].label){
                            all_chart.push(data.chart[i])
                        }
                    }
                    
                    let dates = []
                    let chart_quan = []
                    
                    for(i=0;i<all_chart.length;i++){
                        let parse_date = all_chart[i].date.split('T');
                        dates.push(parse_date[0])
                        chart_quan.push(all_chart[i].quanity)
                    }
                    chart_quan.splice(0,chart_quan.length - 10)
                    dates.splice(0,dates.length - 10)
                    let myChart = document.getElementById('myChart').getContext('2d');
                    let itemChart = new Chart(myChart, {
                        
                        type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                        data: {
                            labels: dates,
                            datasets: [{
                                label: selected_name[0].label,
                                data: chart_quan
                            }]
                        },
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10
                            }
                        }],
                        options: {
                            responsive: true,
                            legend: {
                                display: false
                            },
                            title: {
                                display: false,
                                text: 'Chart.js bar Chart'
                            },
                            animation: {
                                animateScale: true
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function (value) { if (Number.isInteger(value)) { return value; } },
                                        stepSize: 1
                                    }
                                }]
                            }
                        }
                    });
                    // 
                    // 
                    // //////////////////////////////////////////////////////////////////////
                    let myMobileChart = document.getElementById('myMobileChart').getContext('2d');
                    let itemMobileChart = new Chart(myMobileChart, {
                        
                        type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                        data: {
                            labels: dates,
                            datasets: [{
                                label: selected_name[0].label,
                                data: chart_quan
                            }]
                        },
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10
                            }
                        }],
                        options: {
                            responsive: true,
                            legend: {
                                display: false
                            },
                            title: {
                                display: false,
                                text: 'Chart.js bar Chart'
                            },
                            animation: {
                                animateScale: true
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function (value) { if (Number.isInteger(value)) { return value; } },
                                        stepSize: 1
                                    }
                                }]
                            }
                        }
                    });












                    // ///////////////////////////////////////////////////////////////////////
                    // 
                    $('.type').change(function () {
                        
                        selected_option = $('.type option:selected')
                        $(".name").empty();
                        for (j = 0; j < all_items.length; j++) {
                            if (all_items[j].desc == selected_option[0].label) {
                                $(".name").append("<option value='" + all_items[j].name + "'>" + all_items[j].name + "</option>");
                            }
                        }
                        selected_name = $('.name option:selected')
                        
                        
                        all_chart =[]
                        dates=[]
                        chart_quan=[]
                        for(i=0;i<data.chart.length;i++){
                            if(data.chart[i].name==selected_name[0].label && data.chart[i].desc==selected_option[0].label){
                                all_chart.push(data.chart[i])
                            }
                        }
                        
                        for(i=0;i<all_chart.length;i++){
                            let parse_date = all_chart[i].date.split('T');
                            dates.push(parse_date[0])
                            chart_quan.push(all_chart[i].quanity)
                        }
                        chart_quan.splice(0,chart_quan.length - 10)
                        dates.splice(0,dates.length - 10)

                        itemChart.config.data.labels = dates
                        itemChart.config.data.datasets[0].data = chart_quan
                        itemChart.config.data.datasets[0].label = selected_name[0].label
                        itemChart.update();
                    });
                    $('.name').change(function () {
                        selected_name = $('.name option:selected')
                        all_chart =[]
                        dates=[]
                        chart_quan=[]
                        for(i=0;i<data.chart.length;i++){
                            if(data.chart[i].name==selected_name[0].label && data.chart[i].desc==selected_option[0].label){
                                all_chart.push(data.chart[i])
                            }
                        }

                        for(i=0;i<all_chart.length;i++){
                            let parse_date = all_chart[i].date.split('T');
                            dates.push(parse_date[0])
                            chart_quan.push(all_chart[i].quanity)
                        }
                        itemChart.config.data.labels = dates
                        itemChart.config.data.datasets[0].data = chart_quan
                        itemChart.config.data.datasets[0].label = selected_name[0].label
                        itemChart.update();
                    });

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
                                
                                        selected_option = $('.select_choice option:selected')
                                        $(".mobile_name").empty();
                                        for (j = 0; j < all_items.length; j++) {
                                            if (all_items[j].desc == selected_option[0].label) {
                                                $(".mobile_name").append("<option value='" + all_items[j].name + "'>" + all_items[j].name + "</option>");
                                            }
                                        }
                                        selected_name = $('.mobile_name option:selected')
                                        
                                        
                                        all_chart =[]
                                        dates=[]
                                        chart_quan=[]
                                        for(i=0;i<data.chart.length;i++){
                                            if(data.chart[i].name==selected_name[0].label && data.chart[i].desc==selected_option[0].label){
                                                all_chart.push(data.chart[i])
                                            }
                                        }
                                        
                                        for(i=0;i<all_chart.length;i++){
                                            let parse_date = all_chart[i].date.split('T');
                                            dates.push(parse_date[0])
                                            chart_quan.push(all_chart[i].quanity)
                                        }

                                        chart_quan.splice(0,chart_quan.length - 10)
                                        dates.splice(0,dates.length - 10)
                                        itemMobileChart.config.data.labels = dates
                                        itemMobileChart.config.data.datasets[0].data = chart_quan
                                        itemMobileChart.config.data.datasets[0].label = selected_name[0].label
                                        itemMobileChart.update();
                                   
                                }
                            }
                        })
                        
                    })
                    $('.mobile_name').change(function () {
                        selected_name = $('.mobile_name option:selected')
                        all_chart =[]
                        dates=[]
                        chart_quan=[]
                        for(i=0;i<data.chart.length;i++){
                            if(data.chart[i].name==selected_name[0].label && data.chart[i].desc==selected_option[0].label){
                                all_chart.push(data.chart[i])
                            }
                        }

                        for(i=0;i<all_chart.length;i++){
                            let parse_date = all_chart[i].date.split('T');
                            dates.push(parse_date[0])
                            chart_quan.push(all_chart[i].quanity)
                        }
                        chart_quan.splice(0,chart_quan.length - 10)
                        dates.splice(0,dates.length - 10)
                        itemMobileChart.config.data.labels = dates
                        itemMobileChart.config.data.datasets[0].data = chart_quan
                        itemMobileChart.config.data.datasets[0].label = selected_name[0].label
                        itemMobileChart.update();
                    });
                }).catch((error)=>{
                    console.log(error)
                })
            })
        })
    }).catch((error)=>{
        console.log(error)
    })
    setTimeout(function () {
        var acc = document.getElementsByClassName("item");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
                to highlight the button that controls the panel */
                if ($(this).hasClass('.active')) {} else {
                    $(this).addClass('active')
                }
                $(this).siblings().removeClass('active')
                /* Toggle between hiding and showing the active panel */
                panel = $('.ind_' + this.textContent).children()
                panel_sib = $('.ind_' + this.textContent).siblings().children()
                panel_parent = $('.ind_' + this.textContent)
                panel_pib = $('.ind_' + this.textContent).siblings()
                for (i = 0; i < panel.length; i++) {
                    if ($(panel).css('max-height') == '0px') {
                        $(panel_sib).css({
                            'max-height': 0
                        })
                        $(panel_pib).css({
                            'display': 'none'
                        })
                        $(panel_parent).css({
                            'display': 'inline-flex'
                        })
                        $(panel).each(function () {
                            $(this).css({
                                'max-height': panel[i].scrollHeight
                            })
                        })
                        $(window).on('resize', function(){
                            for (i = 0; i < panel.length; i++) {
                            $(panel).each(function () {
                                $(this).css({
                                    'max-height': panel[i].scrollHeight
                                })
                            })
                        }
                      });
                            
                        
                    }
                }

            });
        }
    }, 2000)

    //settimeout so we can fetch current database info

    setTimeout(function () {

        const updateForm = document.getElementsByClassName('update')
        const quanity = document.getElementsByClassName('two')
        const min = document.getElementsByClassName('three')
        const max = document.getElementsByClassName('four')


        //adding event listener to each form for updating
        for (let i = 0; i < updateForm.length; i++) {
            updateForm[i].addEventListener('submit', (e) => {
                e.preventDefault()
                console.log(quanity[i])
                const name1 = updateForm[i].previousSibling.previousSibling.textContent
                const desc1 = updateForm[i].previousSibling.textContent
                let curr_quan = updateForm[i].previousSibling.previousSibling.previousSibling.textContent
                curr_quan = curr_quan.split(" ").pop();
                const quanity1 = quanity[i].value
                const min1 = min[i].value
                const max1 = max[i].value
                if (min1 > Number(curr_quan)) {
                    return 
                }
                if (max1 != '') {
                    if (min1 > max1) {
                        return 
                    }
                }
                fetch('/update_full?name=' + name1 + '&quanity=' + quanity1 + '&desc=' + desc1 + '&min=' + min1 + '&max=' + max1).then((response) => {
                    response.json().then((data) => {

                    })

                })
                const quan_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling.previousSibling
                const min_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling
                const max_chan = updateForm[i].previousSibling.previousSibling.previousSibling
                if (quanity1 != "") {
                    $(quan_chan).text("quanity: " + quanity1)
                }
                if (min1 != "") {
                    $(min_chan).text("min: " + min1)
                }
                if (max1 != "") {
                    $(max_chan).text("max: " + max1)
                }
            })
        }
    }, 1000)

    // mobile verion
    setTimeout(function () {

        const updateFormM = document.getElementsByClassName('mobile_update')
        const quanityM = document.getElementsByClassName('twoM')
        const minM = document.getElementsByClassName('threeM')
        const maxM = document.getElementsByClassName('fourM')


        //adding event listener to each form for updating
        for (let i = 0; i < updateFormM.length; i++) {
            updateFormM[i].addEventListener('submit', (e) => {
                e.preventDefault()
                let curr_quan
                console.log(curr_quan)
                $('.mobile_update').children().each(function(){
                    if($(this).hasClass('twoM')){
                         curr_quan = $(this).attr('placeholder')
                         console.log(curr_quan)
                    }
                })
                console.log(curr_quan)
                const name1 = $(updateFormM[i]).prev().text()
                const desc1 = $('.select_choice option:selected').text()
                const quanity1 = quanityM[i].value
                const min1 = minM[i].value
                const max1 = maxM[i].value
                if (min1 > Number(curr_quan)) {
                    return 
                }
                if (max1 != '') {
                    if (min1 > max1) {
                        return 
                    }
                }
                fetch('/update_full?name=' + name1 + '&quanity=' + quanity1 + '&desc=' + desc1 + '&min=' + min1 + '&max=' + max1).then((response) => {
                    response.json().then((data) => {
                        
                    })

                })
                $('.mobile_update').children().each(function(){
                    console.log('working')
                    if (quanity1 != "" && $(this).hasClass('twoM')) {
                        $(this).attr("placeholder",quanity1)
                    }
                    if (min1 != ""&& $(this).hasClass('threeM')) {
                        $(this).attr("placeholder",min1)
                    }
                    if (max1 != ""&& $(this).hasClass('fourM')) {
                        $(this).attr("placeholder",max1)
                    }
                })
                
            })
        }
    }, 1000)
    addForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const des = desc.value
        const na = nam.value
        const qua = quan.value
        const mi = min.value
        const ma = max.value
        fetch('/create?desc=' + des + '&nam=' + na + '&quan=' + qua + '&min=' + mi + '&max=' + ma).then((response) => {
            response.json().then((data) => {})
        })
    })
    setTimeout(function () {
        const curr_delete = document.getElementsByClassName('delete')
        for (i = 0; i < curr_delete.length; i++) {
            $(curr_delete[i]).click(function () {
                $(this).parent().css({
                    'max-height': 0,
                    'display': 'none'
                })
                const na = this.nextSibling.textContent
                const des = this.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent
                fetch('/delete?desc=' + des + '&nam=' + na).then((response) => {
                    response.json().then((data) => {})
                })
            })

        }
    }, 1000)

    //function for updating all of the different forms at once
    //goes through all the different forms and clicks their update button
    const up_all = () => {
        setTimeout(function () {
            const updateForm = document.getElementsByClassName('update')
            const quanity = document.getElementsByClassName('two')
            const min = document.getElementsByClassName('three')
            const max = document.getElementsByClassName('four')

            for (let i = 0; i < updateForm.length; i++) {
                updateForm[i].addEventListener('click', (e) => {
                    e.preventDefault()
                    const name1 = updateForm[i].previousSibling.previousSibling.textContent
                    const desc1 = updateForm[i].previousSibling.textContent
                    let curr_quan = updateForm[i].previousSibling.previousSibling.previousSibling.textContent
                    curr_quan = curr_quan.split(" ").pop();
                    const quanity1 = quanity[i].value
                    const min1 = min[i].value
                    const max1 = max[i].value
                    if (min1 > Number(curr_quan)) {
                        return 
                    }
                    if (max1 != '') {
                        if (min1 > max1) {
                            return 
                        }
                    }
                    fetch('/update_full?name=' + name1 + '&quanity=' + quanity1 + '&desc=' + desc1 + '&min=' + min1 + '&max=' + max1)

                    const quan_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling.previousSibling
                    const min_chan = updateForm[i].previousSibling.previousSibling.previousSibling.previousSibling
                    const max_chan = updateForm[i].previousSibling.previousSibling.previousSibling
                    if (quanity1 != "") {
                        $(quan_chan).text("quanity: " + quanity1)
                    }
                    if (min1 != "") {
                        $(min_chan).text("min: " + min1)
                    }
                    if (max1 != "") {
                        $(max_chan).text("max: " + max1)
                    }

                })
                updateForm[i].click()
            }
            setTimeout(function () {
                location.reload()
            }, 2000);
            return 

        }, 2000)
    }

    //add click for updating all of the forms
    setTimeout(function () {
        $('.all_form').click(function () {
            up_all()
        });
    }, 1000)



    //create new mobile exit

    $('.close').on('click',function(){
        $('.cre_contain').addClass('hide');
    })
    $('.new').on('click',function(){
        $('.cre_contain').removeClass('hide');
    })
    //resolution changes
    let width = $(window).width();
    if(width <= 768){
        $('.container, .main-content , .big, .cre_contain,.user_form').addClass('hide');
        $('.nav_bar , .grid_mobile, .select_menu').removeClass('hide');
    }else{
        $('.container, .main-content , .big, .cre_contain,.user_form').removeClass('hide');
        $('.nav_bar , .grid_mobile, .select_menu').addClass('hide');
    }
    
    $( window ).resize(function() {
        width = $(window).width();
        if(width <= 768){
            
            $('.container , .main-content, .big, .cre_contain,.user_form').addClass('hide');
            $('.nav_bar , .grid_mobile, .select_menu').removeClass('hide');
            
        }
        else{
            $('.nav_bar , .grid_mobile, .select_menu').addClass('hide');
            $('.container, .main-content, .big, .cre_contain,.user_form').removeClass('hide');
            
        }
    });
})