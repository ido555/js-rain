const delay = ms => new Promise(res => setTimeout(res, ms));

var speed = 5
var density = 15
var i = 0;
var drops = "";
 var makeItRain = async function () {

// setTimeout(function () {}, 2); 
    for (let index = 0; index < density; index++) {
            while (i < 105) {
                var rand = Math.random()*15;
                await delay(50)
                i += rand;
                //add in a new raindrop with various randomizations to certain CSS properties
                drops +=
                    '<div class="drop"style="left: ' + i + '%; bottom: ' + (rand * 2 + 99) +'%;' +
                        'animation-delay: ' + speed +'s;' +  
                        'animation-duration: ' + speed + 's">' +
                    '<div class="stem" style="animation-delay: '+ speed + 's;'+
                        'animation-duration: ' + speed + 's;"></div>' +
                    '</div>'

            }

        $('.rain.front-row').append(drops);
        i = 0;
        drops = ""
        if(index > index/2){
            speed = 6.5
        }
    }

}
window.addEventListener('resize', ()=>{
    i = 0;
    drops = "";
});
makeItRain();