$(document).ready(function(e){

	var canvas = document.getElementById('can'),
    ctx = canvas.getContext('2d');
    let vertices = [];
    let form = document.getElementById("frm");
    // resize the canvas to fill browser window dynamically
    //window.addEventListener('resize', resizeCanvas, false);
    form.addEventListener("submit",sub);

    function resizeCanvas() {
    	let x,y;
    		vertices = [];
            
			if ( $(window).width() > 739){
				canvas.width = window.innerWidth;
            	canvas.height = window.innerHeight;
				 x = 2*window.innerWidth/3;
				 y = window.innerHeight/2;
			}
			else
			{
				canvas.width = window.innerWidth;
            	canvas.height = 2*window.innerHeight;
				console.log("type2");
				 x = window.innerWidth/2;
				 y = 1.5*window.innerHeight;
			}
            ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.translate(x,y);
    }
    
    resizeCanvas();

    function drawC(x,y,f){
    	ctx.beginPath();
    	if(f)ctx.strokeStyle = "lime";
    	else ctx.strokeStyle = "white";
		ctx.arc(x, y, 0.5, 0, 2 * Math.PI);
		ctx.stroke(); 
    }

    function drawP(n,r){
    	for (let i = 0; i < n; i++) {
  			let x = r * Math.cos(2 * Math.PI * i / n);
  			let y = r * Math.sin(2 * Math.PI * i / n);
  			drawC(x,y,1);
  			vertices.push({x:x,y:y});
  		}
  		console.log(vertices.length);
    }

    function drawFractal(n,f){
    	let newx=newy=0,px,py,random;
    	for(let i=0;i<20000;i++){
    		random = Math.floor(Math.random() * n);
    		px = vertices[random].x;
    		py = vertices[random].y;
    		newx = (f*px) + ((1-f)*newx);
    		newy = (f*py) + ((1-f)*newy);
    		drawC(newx,newy,0);
    	}    	
    }

    function sub(e){
    	e.preventDefault();
    	resizeCanvas();
			console.log("Here");
			let n = form.points.value;
    		let f = form.frac.value;
    		drawP(n,200);	
			drawFractal(n,f);
		}

});
