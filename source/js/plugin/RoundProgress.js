/**
 * Created by Kolou on 2017/2/23.
 */
class roundProgress {
    constructor(option) {

        //dom
        this.dom=option.dom;
        if(!this.dom){
            return false;
        }

        //width
        this.width=this.dom.clientWidth;

        //height
        this.height=this.dom.clientHeight;

        //progress
        if(option.progress==0){
            this.progress=option.progress;
        }else{
            this.progress=option.progress||100;
        }

        //rotate

        //scale
        this.scale=option.scale||0;
        if(!this.scale){this.scale=0.5}else{this.scale+=0.5}

        //speed
        this.speed=option.speed||10;

        //step
        this.step=option.step||3;

        //font
        this.fontColor=option.fontColor||'#333';
        this.fontSize=option.fontSize||'16';

        //line
        this.lineWidth=option.lineWidth||5;
        this.lineColor=option.lineColor||'#007DCC';
        this.lineBgColor=option.lineBgColor||'#ccc';
        this.lineSpeed=option.lineSpeed||10;

        //info_txt
        this.startTxt=option.startTxt||'';
        this.endTxt=option.endTxt||'';

        //do init
        this.init();
    }

    init(){
        this.dom.innerHTML=('' +
        '<canvas width="'+this.width*2+'" height="'+this.height*2+'"></canvas>' +
        '<div class="rp_middle"><span>0</span><em>%</em></div>' +
        '<div class="rp_info_txt">' +
        '<span class="rp_info_start_txt">'+this.startTxt+'</span>' +
        '<span class="rp_info_end_txt">'+this.endTxt+'</span>' +
        '</div>');
        this.canvasDom=document.querySelector('.'+this.dom.className+' canvas');
        this.numDom=document.querySelector('.'+this.dom.className+' .rp_middle');
        this.numDom.style.lineHeight=this.height-this.lineWidth/4+'px';
        this.numDom.style.fontSize=this.fontSize;
        this.numDom.style.color=this.fontColor;
        this.numDom.style.textAlign='center';
        this.numDom.style.width=this.width+'px';
        this.numDom.style.left=0;
        this.numDom.style.top=0;
        this.numDom.style.position='absolute';

        this.txtDom=document.querySelector('.'+this.dom.className+' .rp_info_txt');
        this.txtDom.style.width=this.width+'px';
        this.txtDom.style.height=this.height+'px';
        this.txtDom.style.left=0;
        this.txtDom.style.top=0;
        this.txtDom.style.position='absolute';

        this.animateBg();
    }

    animate(){
        var _self=this;
        var c = this.canvasDom;
        var canvas = c.getContext("2d");
        var x=0;
        var drewSwitch=false;
        var drew=function(){
            setTimeout(function(){
                //drewSwitch
                if(drewSwitch){return;}

                //clear
                canvas.clearRect(0,0,_self.width*2,_self.height*2);

                //tip start line
                canvas.beginPath();
                canvas.lineWidth=_self.lineWidth*2.5;
                canvas.lineCap="butt";
                canvas.strokeStyle=_self.lineBgColor;
                if(this.scale==0.5){
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale-0.01)*Math.PI,false);
                }else{
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*1.25,_self.scale*Math.PI,(_self.scale+0.002)*Math.PI,false);
                }
                canvas.stroke();

                //tip end line
                canvas.beginPath();
                canvas.lineWidth=_self.lineWidth*2.5;
                canvas.lineCap="butt";
                canvas.strokeStyle=_self.lineBgColor;
                if(this.scale==0.5){
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale-0.01)*Math.PI,true);
                }else{
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*1.25,(1-_self.scale)*Math.PI,(1-_self.scale-0.002)*Math.PI,true);
                }
                canvas.stroke();

                //bg line
                canvas.beginPath();
                canvas.lineWidth=_self.lineWidth;
                canvas.lineCap="butt";
                canvas.strokeStyle=_self.lineBgColor;
                if(this.scale==0.5){
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale-0.01)*Math.PI,false);
                }else{
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale)*Math.PI,false);
                }
                canvas.stroke();

                //line
                canvas.beginPath();
                canvas.lineWidth=_self.lineWidth;
                canvas.lineCap="butt";
                canvas.strokeStyle=_self.lineColor;
                canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(_self.scale+x/100*Math.min(_self.progress,99.4)/100)*Math.PI,false);
                canvas.stroke();

                if(x/100+_self.scale >= 3-_self.scale){
                    drewSwitch=true;
                    //clearInterval(drew);
                    _self.numDom.childNodes[0].innerHTML=_self.progress;
                }else{
                    x += _self.step;
                    var num=(x/100+_self.scale);
                    var total=((3-_self.scale)/_self.progress*100);
                    num=Math.floor(num/total*100);
                    _self.numDom.childNodes[0].innerHTML=num;
                }

                //call
                drew();
            },_self.speed)
        };
        drew();
    };

    animateBg(){
        var _self=this;
        var c = this.canvasDom;
        var canvas = c.getContext("2d");
        var x=0;
        var drewSwitch=false;
        var drew=function(){
            setTimeout(function(){
                //drewSwitch
                if(drewSwitch){return;}

                //clear
                canvas.clearRect(0,0,_self.width*2,_self.height*2);

                //tip start line
                canvas.beginPath();
                canvas.lineWidth=_self.lineWidth*2.5;
                canvas.lineCap="butt";
                canvas.strokeStyle=_self.lineBgColor;
                if(this.scale==0.5){
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale-0.01)*Math.PI,false);
                }else{
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*1.25,_self.scale*Math.PI,(_self.scale+0.002)*Math.PI,false);
                }
                canvas.stroke();

                //tip end line
                canvas.beginPath();
                canvas.lineWidth=_self.lineWidth*2.5;
                canvas.lineCap="butt";
                canvas.strokeStyle=_self.lineBgColor;
                if(this.scale==0.5){
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale-0.01)*Math.PI,true);
                }else{
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*1.25,(1-_self.scale)*Math.PI,(1-_self.scale-0.002)*Math.PI,true);
                }
                canvas.stroke();

                //bg line
                canvas.beginPath();
                canvas.lineWidth=_self.lineWidth;
                canvas.lineCap="butt";
                canvas.strokeStyle=_self.lineBgColor;
                if(this.scale==0.5){
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale-0.01)*Math.PI,false);
                }else{
                    canvas.arc(_self.width,_self.height,_self.height-_self.lineWidth*2,_self.scale*Math.PI,(3-_self.scale)*Math.PI,false);
                }
                canvas.stroke();


                //call
                //drew();
            },_self.speed)
        };


        drew();
    };

}

module.exports=roundProgress;