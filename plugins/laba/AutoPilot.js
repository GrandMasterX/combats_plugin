var AStar = (function () {
    function diagonalSuccessors($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i) {
        if($N) {
            $E && !grid[N][E] && (result[i++] = {x:E, y:N});
            $W && !grid[N][W] && (result[i++] = {x:W, y:N});
        }
        if($S){
            $E && !grid[S][E] && (result[i++] = {x:E, y:S});
            $W && !grid[S][W] && (result[i++] = {x:W, y:S});
        }
        return result;
    }
    function diagonalSuccessorsFree($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i) {
        $N = N > -1;
        $S = S < rows;
        $E = E < cols;
        $W = W > -1;
        if($E) {
            $N && !grid[N][E] && (result[i++] = {x:E, y:N});
            $S && !grid[S][E] && (result[i++] = {x:E, y:S});
        }
        if($W) {
            $N && !grid[N][W] && (result[i++] = {x:W, y:N});
            $S && !grid[S][W] && (result[i++] = {x:W, y:S});
        }
        return result;
    }
    function nothingToDo($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i) {
        return result;
    }
    function successors(find, x, y, grid, rows, cols){
        var
            N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            $N = N > -1 && !grid[N][x],
            $S = S < rows && !grid[S][x],
            $E = E < cols && !grid[y][E],
            $W = W > -1 && !grid[y][W],
            result = [],
            i = 0
        ;
        $N && (result[i++] = {x:x, y:N});
        $E && (result[i++] = {x:E, y:y});
        $S && (result[i++] = {x:x, y:S});
        $W && (result[i++] = {x:W, y:y});
        return find($N, $S, $E, $W, N, S, E, W, grid, rows, cols, result, i);
    }
    function diagonal(start, end, f1, f2) {
        return f2(f1(start.x - end.x), f1(start.y - end.y));
    }
    function euclidean(start, end, f1, f2) {
        var
            x = start.x - end.x,
            y = start.y - end.y
        ;
        return f2(x * x + y * y);
    }
    function manhattan(start, end, f1, f2) {
        return f1(start.x - end.x) + f1(start.y - end.y);
    }
    function AStar(grid, start, end, f) {
        var
            cols = grid[0].length,
            rows = grid.length,
            limit = cols * rows,
            f1 = Math.abs,
            f2 = Math.max,
            list = {},
            result = [],
            open = [{x:start[0], y:start[1], f:0, g:0, v:start[0]+start[1]*cols}],
            length = 1,
            adj, distance, find, i, j, max, min, current, next
        ;
        end = {x:end[0], y:end[1], v:end[0]+end[1]*cols};
        switch (f) {
            case "Diagonal":
                find = diagonalSuccessors;
            case "DiagonalFree":
                distance = diagonal;
                break;
            case "Euclidean":
                find = diagonalSuccessors;
            case "EuclideanFree":
                f2 = Math.sqrt;
                distance = euclidean;
                break;
            default:
                distance = manhattan;
                find = nothingToDo;
                break;
        }
        find || (find = diagonalSuccessorsFree);
        do {
            max = limit;
            min = 0;
            for(i = 0; i < length; ++i) {
                if((f = open[i].f) < max) {
                    max = f;
                    min = i;
                }
            };
            current = open.splice(min, 1)[0];
            if (current.v != end.v) {
                --length;
                next = successors(find, current.x, current.y, grid, rows, cols);
                for(i = 0, j = next.length; i < j; ++i){
                    (adj = next[i]).p = current;
                    adj.f = adj.g = 0;
                    adj.v = adj.x + adj.y * cols;
                    if(!(adj.v in list)){
                        adj.f = (adj.g = current.g + distance(adj, current, f1, f2)) + distance(adj, end, f1, f2);
                        open[length++] = adj;
                        list[adj.v] = 1;
                    }
                }
            } else {
                i = length = 0;
                do {
                    result[i++] = [current.x, current.y];
                } while (current = current.p);
                result.reverse();
            }
        } while (length);
        return result;
    }
    return AStar;
}());
var PluginFrame=null; 
if(typeof(top.frames['plugin'])=='undefined')
{
     if(typeof(top.frames[0])!='undefined')
     {
           if(typeof(top.frames[0].window.PM)!='undefined')
           {
               PluginFrame=top.frames[0].window;
           }
     }
}
else
{
    PluginFrame=top.frames['plugin'].window;
}

var PluginPilot=null;
if(PluginFrame!=null)
{
    PluginFrame.$(PluginFrame.PM.plugins).each(function(){
        if(this.id=="LabaPilot")
        {
            PluginPilot=this;
        }
    })
}
var allowed=null;
function IsAllowed(){
	allowed=true;
	return allowed;
}
function checkPoint(Point, kyda, xmax) {
	if(
	Point.was == 0 && 
	Point.img != "http://i.oldbk.com/llabb/m.gif" && 
	Point.img != "http://i.oldbk.com/llabb/a2.gif" && 
	Point.img != "http://i.oldbk.com/llabb/e2.gif" && 
	Point.img != "http://i.oldbk.com/llabb/m2.gif" && 
	Point.img != "http://i.oldbk.com/llabb/n.gif" && 
	(kyda - Math.floor((kyda)/xmax)*xmax)!=1 && 
	(kyda - Math.floor((kyda)/xmax)*xmax)!=xmax && 
	(kyda - Math.floor((kyda)/xmax)*xmax)!=0 && 
	Point.img != "http://i.oldbk.com/llabb/c.gif" && 
	Point.img != "http://i.oldbk.com/llabb/d.gif" && 
	Point.img != "http://i.oldbk.com/llabb/x.gif" && 
	Point.img != "http://i.oldbk.com/llabb/z.gif"
	) {
		return true;
	}else{
		return false;
	}
}
function whoPoint(scr) {	
			if(scr == 'http://i.oldbk.com/llabb/m.gif' || scr == 'http://i.oldbk.com/llabb/m2.gif' || scr == 'http://i.oldbk.com/llabb/n.gif' || scr == 'http://i.oldbk.com/llabb/a2.gif' || scr == 'http://i.oldbk.com/llabb/e2.gif')return 'stena';
			if(scr == 'http://i.oldbk.com/llabb/r.gif' || scr == 'http://i.oldbk.com/llabb/r2.gif' || scr == 'http://i.oldbk.com/llabb/j2.gif')return 'monstr';
			if(scr == 'http://i.oldbk.com/llabb/b.gif' || scr == 'http://i.oldbk.com/llabb/b2.gif' )return 'lovushka';
			if(scr == 'http://i.oldbk.com/llabb/o.gif' || scr == 'http://i.oldbk.com/llabb/o2.gif' || scr== 'http://i.oldbk.com/llabb/g.gif')return 'doroga';
			if(scr == 'http://i.oldbk.com/llabb/c.gif' || scr == 'http://i.oldbk.com/llabb/d.gif' || scr == 'http://i.oldbk.com/llabb/x.gif'|| scr == 'http://i.oldbk.com/llabb/z.gif' )return 'dver'; 
			if(scr == 'http://i.oldbk.com/llabb/y2.gif' || scr == 'http://i.oldbk.com/llabb/l2.gif' || scr == 'http://i.oldbk.com/llabb/k2.gif' || scr == 'http://i.oldbk.com/llabb/w2.gif')return 'larec'; 
			if(scr == 'http://i.oldbk.com/llabb/s.gif' || scr == 'http://i.oldbk.com/llabb/s2.gif')return 'sunduk'; 
			if(scr == 'http://i.oldbk.com/llabb/h.gif' || scr == 'http://i.oldbk.com/llabb/h2.gif')return 'heal'; 
			if(scr == 'http://i.oldbk.com/llabb/p.gif' || scr == 'http://i.oldbk.com/llabb/p2.gif')return 'pandora';
		return '';
}  
function LabaKeyPressed(e) {
            	var key = -1;
		var evt;
        	if(window.event){
			evt=window.event;
			key=(evt.charCode)?evt.charCode: ((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0)); 
        	}
        	else{
          		evt = e;
			key=(evt.charCode)?evt.charCode: ((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0)); 
        	}
		if(key==13)
		{ 
			if(PluginPilot.started)
			{
				PluginPilot.Stop();
			}
			else
			{
				PluginPilot.Begin();
			}
			if(e.preventDefault)
				e.preventDefault();
			else
				return false;
		}
		else if(key==109||key==1100)
		{
			Pilot.ShowMap();
		}
		else
		{
		}
}
var LabaPoint=function(type,img,x,y,title)
{
    if (typeof title == 'undefined' ) title = '';
    this.type=type;
    this.img=img;
    this.x=x;
    this.y=y;
    this.title=title;
}
var WasPoint=function(img, was, sosedi)
{
    this.was=was;
    this.sosedi=sosedi;
    this.img=img;
}
var LabaMap=function(me_x,me_y,size)
{ 
    if (typeof size == 'undefined' ) size = 11;
    this.me=new LabaPoint(2,"",me_x,me_y);
    this.x_add=0;
    this.y_add=0;
    this.Points=new Array();
    this.PointsXY=[];
    this.AddPoint=function(node)
    {
        var src=node.src;
        var type=1;
        if(src.indexOf('m.gif')!=-1||src.indexOf('n.gif')!=-1||src.indexOf('m2.gif')!=-1||src.indexOf('a2.gif')!=-1||src.indexOf('e2.gif')!=-1||src.indexOf('c.gif')!=-1||src.indexOf('d.gif')!=-1||src.indexOf('x.gif')!=-1||src.indexOf('z.gif')!=-1)
        {
            type=0;
        }
        else if(src.indexOf('u.gif')!=-1||src.indexOf('u2.gif')!=-1)
        {
            type=2;
            this.ReCalculate();
        }
	var x = this.x_add+this.GetCurrentXOffset();
	var y = this.y_add+this.GetCurrentYOffset();
        var point=new LabaPoint(type,src,x,y,node.title);
        this.Points.push(point);
	this.PointsXY[x+','+y]=this.Points.length-1;
    }
    this.GetCurrentXOffset=function()
    {
        var x=(this.Points.length+1)%size;
        if(x==0)
            x=size;
        return x;
    } 
    this.GetCurrentYOffset=function()
    {
        var y=(this.Points.length+1)/size;
        return Math.ceil(y);
    }
    this.ReCalculate=function()
    {
        this.x_add=this.me.x-this.GetCurrentXOffset();
        this.y_add=this.me.y-this.GetCurrentYOffset();
        for(var i in this.Points)
        {
            this.Points[i].x=this.Points[i].x+this.x_add;
            this.Points[i].y=this.Points[i].y+this.y_add;
            this.PointsXY[this.Points[i].x+','+this.Points[i].y]=i;
        }
    }
    this.printf=function()
    {
        var result='';
        for(var i in this.Points)
        {
            result=result+'['
            result=result+this.Points[i].x;
            result=result+'-'+this.Points[i].y;
            result=result+','+this.Points[i].type;
            result=result+']'
        }
        alert(result);
    }
    this.IsOnLine=function(one,two)
    {
        var steps=0;
        if(one.x==two.x)
        {
            for(var i in this.Points)
            {
                var p=this.Points[i];
                if(p.type!=0&&p.x==one.x)
                {
                    if((p.y>one.y&&p.y<two.y)||(p.y<one.y&&p.y>two.y))
                    {
                        steps++;
                    }
                }
            }
            if(Math.abs(one.y-two.y)-1==steps)
                return true;
        }
        else if(one.y==two.y)
        {
            for(var i in this.Points)
            {
                var p=this.Points[i];
                if(p.type!=0&&p.y==one.y)
                {
                    if((p.x>one.x&&p.x<two.x)||(p.x<one.x&&p.x>two.x))
                    {
                        steps++;
                    }
                }
            }
            if(Math.abs(one.x-two.x)-1==steps)
                return true;
        }
        return false;
    }
}
var AutoPilot=function()
{
    this.LabaMap=new LabaMap(1,1);
    this.Me=new LabaPoint(2,"http://old-mercenaries.ru/plugins/laba/point.gif",1,1);
    this.Previmg='';
    this.timer=null;
    this.Newimg=function()
    {
        if(!PluginPilot.started)
        {return 'http://old-mercenaries.ru/plugins/laba/point_start.gif';}
        else
        {return 'http://old-mercenaries.ru/plugins/laba/point_stop.gif';}
        
    }
    this.NextStep=function(begin)
    {	
		
		if (document.body.innerHTML.indexOf('Старьевщик') != -1) {
			PluginPilot.Dealer.x = this.Me.x;
			PluginPilot.Dealer.y = this.Me.y;
			//cap438020817
			
			//top.frames['main'].location.href = 'http://capitalcity.oldbk.com/main.php?edit=1&razdel=2';
			//var checks = /cap[\W]/mi;
			//var res = PluginFrame.$('body',document).html().match(checks);
			if (PluginFrame.$.jStorage.storageAvailable()) {
				var expire =  1000*60*60*24*30;
				PluginFrame.$.jStorage.set('Dealer', PluginFrame.$.toJSON(PluginPilot.Dealer), {TTL: expire});
			}
		}
        if(PluginPilot.started)
        {
            var timeout=3400;
            if(document.body.innerHTML.indexOf('Время перехода +3 секунды')!=-1)
                timeout=6400;
			if(document.URL.indexOf("/lab2.php")!=-1&&timeout==3400) 
				timeout=timeout-1600;
            if( document.getElementById('progress40').style.backgroundColor=='green')
            {
                var Target=PluginPilot.Marshrut[PluginPilot.Marshrut.length-1];
                if(document.getElementById(Target.x+'_'+Target.y))document.getElementById(Target.x+'_'+Target.y).src=this.Newimg();
                timeout=3100; 
            }
            var This=this;
				if(timeout==0 && document.body.innerHTML.indexOf("Не так быстро")==-1)
					this.Go();
				else
					this.timer=setTimeout(function(){This.Go();},timeout);
        }
        
    }
    this.Stop=function()
    {
        if(PluginPilot.Marshrut.length>1)
        {
            var Target=PluginPilot.Marshrut[PluginPilot.Marshrut.length-1];
            document.getElementById(Target.x+'_'+Target.y).src=this.Newimg();
        }
        clearTimeout(this.timer);
        this.timer==null;
    }
    this.Go = function(direction) {
		var This = this;
    	if (PluginPilot.Marshrut.length > 1) {
			var nearest = PluginPilot.Marshrut[1];		
    		var direction = "";
    		if (nearest.x == this.Me.x) {
				if (nearest.y > this.Me.y)
					direction = "p3";
				else
					direction = "p1";
			} else if (nearest.y == this.Me.y) {
				if (nearest.x > this.Me.x)
					direction = "p2";
				else
					direction = "p4";
			}
			var HP = 1000000;
			var rhp = /Уровень жизни[\s\S]*?(\d+)\/(\d+)/mi;
			var res = PluginFrame.$('body',document).html().match(rhp);
			var healing = 0;
			if (res && res.length > 0) {       
				if (PluginPilot.options.buterhill > 0) {
					if (res[1] < PluginPilot.options.buterhill) {
						if (whoPoint(PluginPilot.Marshrut[1].img) == 'monstr' || whoPoint(PluginPilot.Marshrut[1].img) == 'dver' || 
							whoPoint(PluginPilot.Marshrut[1].img) == ''){
							PluginPilot.Heal("buter", true);
							healing = 3;
						}
					}
				}
				if (PluginPilot.options.noattackhp == undefined) { 
					PluginFrame.$("#auto_pilot_noattackhp").keyup();
				}
				var noattackhp = PluginPilot.options.noattackhp;
				if (document.URL.indexOf("/lab2.php") != -1)
		    		noattackhp = 0;
				if	(PluginPilot.options.real_start	== 1) {       
					if	((((document.URL.indexOf("/lab.php") != -1) || (document.URL.indexOf("/lab3.php") != -1)) && 
						((res[1] / res[2]) >= (noattackhp / 100) &&
						(PluginPilot.Marshrut[1].img == 'http://i.oldbk.com/llabb/r.gif' || PluginPilot.Marshrut[1].img == '') || 
						(PluginPilot.Marshrut[1].img != 'http://i.oldbk.com/llabb/r.gif' && PluginPilot.Marshrut[1].img != ''))) ||
						(document.URL.indexOf("/lab2.php") != -1 && (whoPoint(PluginPilot.Marshrut[1].img) != 'stena' ))){
						if (document.URL.indexOf("/lab.php") != -1) {
							this.timer = setTimeout(function(){location.href = 'lab.php?goto=' + direction;}, healing * 1000 + 1);
        				} else if (document.URL.indexOf("/lab2.php") != -1) {
							this.timer = setTimeout(function(){location.href = 'lab2.php?goto=' + direction;}, healing * 1000 + 1);
						} else if (document.URL.indexOf("/lab3.php") != -1) {
							this.timer = setTimeout(function(){location.href = 'lab3.php?goto=' + direction;}, healing * 1000 + 1);
						} else if (this.timer != null) {
    	        			this.timer = setTimeout(function(){This.Go(direction);}, 1000);
        				}
					}
				} else {
					if (document.URL.indexOf("/lab.php") != -1) {
            			location.href = 'lab.php?goto=' + direction;
        			} else if (document.URL.indexOf("/lab2.php") != -1) {
						location.href = 'lab2.php?goto=' + direction;
					} else if (document.URL.indexOf("/lab3.php") != -1) {
						location.href = 'lab3.php?goto=' + direction;
					} else if (this.timer != null) {
            			this.timer = setTimeout(function(){This.Go(direction);}, 100);
        			}
				}
			}
		}
    }
    this.SetGoTo=function(e)
    {   
        var This=Pilot;
        var img=null;
        if(window.event){
            img = event.srcElement;
        }
        else{
            if(e)img = e.target;
        }
	var X_max=25;
	var Y_max=25;
	if(document.URL.indexOf("/lab2.php")!=-1)
	{
		X_max=49;
		Y_max=49;
	}
	var karta=new Array (X_max+1);
	for (i=0; i<=X_max; i++)
			{
				karta[i]=new Array (X_max+1);	
				for (k=0; k<=X_max; k++)
				{
					karta[i][k]=1;
				}
			}
	for(var i in PluginPilot.Map)
	{
		if(PluginPilot.Map[i].img != 'http://i.oldbk.com/llabb/m.gif' && PluginPilot.Map[i].img != 'http://i.oldbk.com/llabb/m2.gif' && PluginPilot.Map[i].img != 'http://i.oldbk.com/llabb/n.gif' && PluginPilot.Map[i].img != 'http://i.oldbk.com/llabb/a2.gif' && PluginPilot.Map[i].img != 'http://i.oldbk.com/llabb/e2.gif' && PluginPilot.Map[i].img != "http://i.oldbk.com/llabb/c.gif" && PluginPilot.Map[i].img != "http://i.oldbk.com/llabb/d.gif" && PluginPilot.Map[i].img != "http://i.oldbk.com/llabb/x.gif" && PluginPilot.Map[i].img != "http://i.oldbk.com/llabb/z.gif")karta[PluginPilot.Map[i].x][PluginPilot.Map[i].y]=0;
	} 
        if(e)var Target=new LabaPoint(img.type1,img.src,img.x1,img.y1);
        var PrevTarget=PluginPilot.Marshrut[PluginPilot.Marshrut.length-1];
		if(e)if ((Target.img.indexOf('c.gif') != -1) || (Target.img.indexOf('d.gif') != -1) || (Target.img.indexOf('x.gif') != -1) || (Target.img.indexOf('z.gif') != -1)) {
			if ((((Target.x == This.Me.x - 1) || (Target.x == This.Me.x + 1)) && (Target.y == This.Me.y)) ||
				(((Target.y == This.Me.y - 1) || (Target.y == This.Me.y + 1)) && (Target.x == This.Me.x))) {
				var keys_item01 = 0;
				if (Target.img.indexOf('d.gif') != -1) var keys_item01 = 1;
				else if (Target.img.indexOf('z.gif') != -1) var keys_item01 = 2;
				else if (Target.img.indexOf('x.gif') != -1) var keys_item01 = 3;
				else if (Target.img.indexOf('c.gif') != -1) var keys_item01 = 4;
					if (keys_item01 > 0) 
						This.OpenDoorClick(keys_item01);	
			}
			return;	
		}
        if(e)if(Target.x==This.Me.x&&Target.y==This.Me.y)
        {
            PluginPilot.Marshrut.splice(1,PluginPilot.Marshrut.length-1);
            PluginPilot.Stop();
            if(This.Previmg!='')
            {
                document.getElementById(PrevTarget.x+'_'+PrevTarget.y).src=This.Previmg;
                This.Previmg='';
            }
			This.TakeDrop();
			This.TakeDropHill();
            return;
        }
        if(e)if(Target.x==PrevTarget.x&&Target.y==PrevTarget.y)
        {
			if (Target.img.indexOf('point_start.gif')) {
				img.src = "http://old-mercenaries.ru/plugins/laba/point_stop.gif";
			} else {
				if (Target.img.indexOf('point_stop.gif')) {
					img.src = "http://old-mercenaries.ru/plugins/laba/point_start.gif";
				}
			}
            if(!PluginPilot.started)
            {
                PluginPilot.Begin();
            }
            else
            {   
                PluginPilot.Stop();
            }
            return;
        } 
		Ya=This.Me.y*X_max + This.Me.x;
		Vverh=Ya-X_max;
		Vniz=Ya+X_max;
		Vlevo=Ya-1;
		Vpravo=Ya+1;
		Sets=0;
		if(PluginPilot.options.real_start==1 || PluginPilot.options.to_exit==1)endPoint=[0,0];
if(PluginPilot.options.real_start==1)
 { 
		if( checkPoint(PluginPilot.AutoMap[Vverh], Vverh, X_max) || checkPoint(PluginPilot.AutoMap[Vniz], Vniz, X_max) || checkPoint(PluginPilot.AutoMap[Vlevo], Vlevo, X_max) || checkPoint(PluginPilot.AutoMap[Vpravo], Vpravo, X_max)){
				if(PluginPilot.AutoMap[Vlevo].was == 0 && Sets==0 && (Vlevo - Math.floor((Vlevo)/X_max)*X_max)>1
				&& PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/e2.gif" && PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/a2.gif" && PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/m.gif" && PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/m2.gif"&& PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/n.gif"&& PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/c.gif" && PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/d.gif" && PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/x.gif" && PluginPilot.AutoMap[Vlevo].img != "http://i.oldbk.com/llabb/z.gif"){
					Sets=1;
					endPoint = [Math.floor((Vlevo)/X_max), (Vlevo - Math.floor((Vlevo)/X_max)*X_max)];
				}
				if(PluginPilot.AutoMap[Vverh].was == 0 && Sets==0 && (Vverh - Math.floor((Vverh)/X_max)*X_max)>1
				&& PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/e2.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/a2.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/m.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/m2.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/n.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/c.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/d.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/x.gif" && PluginPilot.AutoMap[Vverh].img != "http://i.oldbk.com/llabb/z.gif" ){
					Sets=1;
					endPoint = [Math.floor((Vverh)/X_max), (Vverh - Math.floor((Vverh)/X_max)*X_max)];
				}
				if(PluginPilot.AutoMap[Vniz].was == 0 && Sets==0 && (Vniz- Math.floor((Vniz)/X_max)*X_max)>1
				&& PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/e2.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/a2.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/m.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/m2.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/n.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/c.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/d.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/x.gif" && PluginPilot.AutoMap[Vniz].img != "http://i.oldbk.com/llabb/z.gif"){
					Sets=1;
					endPoint = [Math.floor((Vniz)/X_max), (Vniz- Math.floor((Vniz)/X_max)*X_max)];
				}
				if(PluginPilot.AutoMap[Vpravo].was == 0 && Sets==0 && (Vpravo - Math.floor((Vpravo)/X_max)*X_max)>1
				&& PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/e2.gif" && PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/a2.gif" && PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/m.gif" && PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/m2.gif"&& PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/n.gif"&& PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/c.gif" && PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/d.gif" && PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/x.gif"&& PluginPilot.AutoMap[Vpravo].img != "http://i.oldbk.com/llabb/z.gif"){
					Sets=1;
					endPoint = [Math.floor((Vpravo)/X_max), (Vpravo - Math.floor((Vpravo)/X_max)*X_max)];
				}
		}else{
			for(var t=PluginPilot.BeHere.length; t>0; t--){
				Tochka=PluginPilot.BeHere[t-1].y * X_max + PluginPilot.BeHere[t-1].x;
				TVverh=Tochka-X_max;
				TVniz=Tochka+X_max;
				TVlevo=Tochka-1;
				TVpravo=Tochka+1;
		        if( checkPoint(PluginPilot.AutoMap[TVverh], TVverh, X_max) || checkPoint(PluginPilot.AutoMap[TVniz], TVniz, X_max) || checkPoint(PluginPilot.AutoMap[TVlevo], TVlevo, X_max) || checkPoint(PluginPilot.AutoMap[TVpravo], TVpravo, X_max)){
					endPoint = [Math.floor((Tochka)/X_max), (Tochka - Math.floor((Tochka)/X_max)*X_max)];
					t=0;
				}
			}
		}
}
		startPoint = [This.Me.y, This.Me.x]; 
	if(Target)endPoint = [Target.y, Target.x]; 

if(PluginPilot.options.real_start==1 || PluginPilot.options.to_exit==1)
	if(endPoint[0] == 0 && endPoint[1] == 0){

		for(var i in PluginPilot.Map)
		{
			if(PluginPilot.Map[i].img == 'http://i.oldbk.com/llabb/of.gif' || PluginPilot.Map[i].img == 'http://i.oldbk.com/llabb/of2.gif'){ 			
				endPoint = [PluginPilot.Map[i].y, PluginPilot.Map[i].x];				
			}
		} 	
	}
		result=AStar(karta, startPoint, endPoint,"Manhattan");
		if(result.length !== 0){ 
			mrashlenght=PluginPilot.Marshrut.length;
			for(i = 0; i <= (mrashlenght+1); i++) {
				PluginPilot.Marshrut.shift();
			}
			for(i = 0; i < result.length; i++) {
					mappoint="";
					for(var j in PluginPilot.Map)
					{
						if(PluginPilot.Map[j].y==result[i][0] && PluginPilot.Map[j].x==result[i][1])mappoint=PluginPilot.Map[j].img;
					}
					PluginPilot.Marshrut.push(new LabaPoint(2,mappoint,result[i][1],result[i][0]));
				}
			if(This.Previmg!='')
                {
                    document.getElementById(PrevTarget.x+'_'+PrevTarget.y).src=This.Previmg;
                }
            if(e)This.Previmg=img.src;
            if(e)img.src=This.Newimg();
            return; 
		} 
		else 
		{
			if(PluginPilot.options.auto_heroic==1 && document.URL.indexOf("/lab.php")!=-1)
			{			
				var heroic=PluginFrame.$('input[name=gotolab2]',document.body);
				if(heroic.length==1)
				{	
					if (PluginFrame.$.jStorage.storageAvailable())
					{
					}
					heroic[0].onclick='';
					heroic[0].click();
				}
			}
			else if(PluginPilot.options.auto_exit==1)
			{			
				var exit_found = 0;
				var exit=PluginFrame.$('input[name=exit_good]',document.body);
				if(exit.length==1)
				{
					exit_found = 1;
				}
				if (exit_found)
				{

					exit[0].click();
				}
			}
		}
    }
    this.ShowMap=function()
    {
	if(!IsAllowed())
	{
		alert("нет доступа к карте");
	    return;
	}
	var X_max=25;
	var Y_max=25;
	if(document.URL.indexOf("/lab2.php")!=-1)
	{
		X_max=49;
		Y_max=49;
	}
	var html="<html><div style='width:"+(X_max*16-15)+"px'>";
	for(var y=1;y<=Y_max;y++)
	{
		if(y!=1)
		{
			html+="<br/>";
		}
		for(var x=1;x<=X_max;x++)
		{
			html+="X"+x+"Y"+y;
		}
	}
	var title='';
	for(var i in PluginPilot.Map)
	{
		title=typeof(PluginPilot.Map[i].title)!='undefined' ? PluginPilot.Map[i].title : '';
		var bitmap_map = PluginPilot.Map[i].img;
		if (bitmap_map == "http://i.oldbk.com/llabb/s.gif" || bitmap_map == "http://i.oldbk.com/llabb/s2.gif" || 
			bitmap_map == "http://i.oldbk.com/llabb/p.gif" || bitmap_map == "http://i.oldbk.com/llabb/p2.gif" || 
			bitmap_map == "http://i.oldbk.com/llabb/h.gif" || bitmap_map == "http://i.oldbk.com/llabb/h2.gif" || 
			bitmap_map == "http://i.oldbk.com/llabb/u.gif" || bitmap_map == "http://i.oldbk.com/llabb/u2.gif" ||
			bitmap_map == "http://i.oldbk.com/llabb/b.gif" || bitmap_map == "http://i.oldbk.com/llabb/b2.gif" ||
			bitmap_map == "http://i.oldbk.com/llabb/r.gif" || bitmap_map == "http://i.oldbk.com/llabb/r2.gif" ||
			bitmap_map == "http://i.oldbk.com/llabb/j2.gif" ||
			bitmap_map == "http://i.oldbk.com/llabb/ot.gif" || bitmap_map == "http://i.oldbk.com/llabb/ot2.gif" || 
			bitmap_map == "http://i.oldbk.com/llabb/o.gif" || bitmap_map == "http://i.oldbk.com/llabb/o2.gif") {
			var bitmap_map01 = bitmap_map;
			if (PluginPilot.map_uz.length > 0) {
				var map_uz_temp03 = PluginPilot.Map[i].x + "," + PluginPilot.Map[i].y;
				var map_uz_temp04 = 0;
				for (i0=0; i0<PluginPilot.map_uz.length; i0++) {
					var map_uz_temp05 = ";" + map_uz_temp03 + ";";
					if (PluginPilot.map_uz[i0].indexOf(map_uz_temp05) != -1) {
						var map_uz_temp04 = 1;
						break;
					}
				}
				if (map_uz_temp04 == 1) {
					switch (bitmap_map01) {
						case "http://i.oldbk.com/llabb/s.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/sy.gif";
							break
						case "http://i.oldbk.com/llabb/s2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/s2y.gif";
							break
						case "http://i.oldbk.com/llabb/p.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/py.gif";
							break
						case "http://i.oldbk.com/llabb/p2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/p2y.gif";
							break
						case "http://i.oldbk.com/llabb/h.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/hy.gif";
							break
						case "http://i.oldbk.com/llabb/h2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/h2y.gif";
							break
						case "http://i.oldbk.com/llabb/o.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/oy.gif";
							break
						case "http://i.oldbk.com/llabb/o2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/o2y.gif";
							break
						case "http://i.oldbk.com/llabb/ot.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/oty.gif";
							break
						case "http://i.oldbk.com/llabb/ot2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/ot2y.gif";
							break
						case "http://i.oldbk.com/llabb/u.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/uy.gif";
							break
						case "http://i.oldbk.com/llabb/u2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/u2y.gif";
							break
					}
				}
			}
			if (PluginPilot.Marshrut.length>1) {
				var map_uz_temp04 = 0;
				for (i0=0; i0<PluginPilot.Marshrut.length; i0++) {
					var End_Target=PluginPilot.Marshrut[PluginPilot.Marshrut.length-(i0+1)];
					if ((End_Target.x == PluginPilot.Map[i].x) && (End_Target.y == PluginPilot.Map[i].y)) {
						var map_uz_temp04 = 1;
						break;
					}
				}
				if (map_uz_temp04 == 1) {
					switch (bitmap_map01) {
						case "http://i.oldbk.com/llabb/s.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/s3y.gif";
							break
						case "http://i.oldbk.com/llabb/s2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/s4y.gif";
							break
						case "http://i.oldbk.com/llabb/p.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/p3y.gif";
							break
						case "http://i.oldbk.com/llabb/p2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/p4y.gif";
							break
						case "http://i.oldbk.com/llabb/h.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/h3y.gif";
							break
						case "http://i.oldbk.com/llabb/h2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/h4y.gif";
							break
						case "http://i.oldbk.com/llabb/o.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/o3y.gif";
							break
						case "http://i.oldbk.com/llabb/o2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/o4y.gif";
							break
						case "http://i.oldbk.com/llabb/ot.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/ot3y.gif";
							break
						case "http://i.oldbk.com/llabb/ot2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/ot4y.gif";
							break
						case "http://i.oldbk.com/llabb/b.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/b3y.gif";
							break
						case "http://i.oldbk.com/llabb/b2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/b4y.gif";
							break
						case "http://i.oldbk.com/llabb/r.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/r3y.gif";
							break
						case "http://i.oldbk.com/llabb/r2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/r4y.gif";
							break
						case "http://i.oldbk.com/llabb/j2.gif":
							var bitmap_map = "http://old-mercenaries.ru/plugins/laba/j4y.gif";
							break	
					}
				}
			}
		}
		html=html.replace("X"+ PluginPilot.Map[i].x+"Y"+PluginPilot.Map[i].y,"<img id='"+PluginPilot.Map[i].x+"_"+PluginPilot.Map[i].y+"' src='"+bitmap_map+"' title='"+title+"'/>");
	}
	html=html.replace(/X\d+Y\d+/mgi,"<img src='http://old-mercenaries.ru/plugins/laba/point.gif'/>");
	html=html+"</div></hmtl>";
	top.consoleRef=window.open('','map','width='+(X_max*16+10)+',height='+(Y_max*16+10)+',menubar=0,toolbar=0,status=0,scrollbars=0,resizable=1'); 
	if(top.consoleRef==null)
		alert("Возможно у вас заблокированы всплывающие окна для этого сайта. Включите их в настройках!");
	else
	{
		top.consoleRef.document.close(); 
		top.consoleRef.document.open(); 
		top.consoleRef.document.write(html);
	var This=this;
	var LabaMapAll = new LabaMap(this.Me.x,this.Me.y,X_max);
        PluginFrame.$('div>img',top.consoleRef.document.body).each(function(){
            LabaMapAll.AddPoint(this);
        });
	var i=0;
        PluginFrame.$('div>img',top.consoleRef.document.body).each(function(){
            this.x1=LabaMapAll.Points[i].x;
            this.y1=LabaMapAll.Points[i].y;
            this.type1=LabaMapAll.Points[i].type;
				if (this.x1 == PluginPilot.Dealer.x && this.y1 == PluginPilot.Dealer.y && ((this.src.indexOf('o2y.gif') != -1) || (this.src.indexOf('o4y.gif') != -1))) {
					this.src = 'http://old-mercenaries.ru/plugins/laba/2y.gif';
					if (PluginPilot.Marshrut.length>1) {
						for (i0=0; i0<PluginPilot.Marshrut.length; i0++) {
							var End_Target=PluginPilot.Marshrut[PluginPilot.Marshrut.length-(i0+1)];
							if ((End_Target.x == PluginPilot.Dealer.x) && (End_Target.y == PluginPilot.Dealer.y)) {
								this.src = 'http://old-mercenaries.ru/plugins/laba/3y.gif';
							}
						}
					} 
					this.title='Старьевщик X'+this.y1+'Y'+this.x1;
				} else {
					this.title=this.title+' X'+this.y1+'Y'+this.x1;
				}
            this.id=this.x1+'_'+this.y1;
            if(this.type1!=0){
                PluginFrame.Bind("click",this,Pilot.SetGoTo);}
			if ((this.src.indexOf('c.gif') != -1) || (this.src.indexOf('d.gif') != -1) || (this.src.indexOf('x.gif') != -1) || (this.src.indexOf('z.gif') != -1)) {
				PluginFrame.Bind("click",this,Pilot.SetGoTo);
			}
            i++;
        });
	}
    }
   this.ShowMapDebug=function(map)
    {
	if(!IsAllowed())
	{
		alert("нет доступа к карте");
	    return;
	}
	var X_max=25;
	var Y_max=25;
	if(document.URL.indexOf("/lab2.php")!=-1)
	{
		X_max=49;
		Y_max=49;
	}
	var html="<html><div style='width:"+(X_max*16-15)+"px'>";
	for(var y=1;y<=Y_max;y++)
	{
		if(y!=1)
		{
			html+="<br/>";
		}
		for(var x=1;x<=X_max;x++)
		{
			html+="X"+x+"Y"+y;
		}
	}
	for(var i in map)
	{
		html=html.replace("X"+ map[i].x+"Y"+map[i].y,"<img src='"+map[i].img+"'/>");

	}
	html=html.replace(/X\d+Y\d+/mgi,"<img src='http://old-mercenaries.ru/plugins/laba/point.gif'/>");
	html=html+"</div></hmtl>";
	top.consoleRef=window.open('','map','width='+(X_max*16+10)+',height='+(Y_max*16+10)+',menubar=0,toolbar=1,status=0,scrollbars=1,resizable=1');
	if(top.consoleRef==null)
		alert("Возможно у вас заблокированы всплывающие окна для этого сайта. Включите их в настройках!");
	else
	{
		top.consoleRef.document.close(); 
		top.consoleRef.document.open(); 
		top.consoleRef.document.write(html);
	}
    }	
    this.CloseMap=function()
    {
	var $map=PluginFrame.$('#my_map_div',document.body);
	$map.hide();
    }
    this.TakeDrop=function()
    {
        if(document.body.innerHTML.indexOf("Недостаточно места в рюкзаке.")!=-1)
        {
            PluginPilot.options.autodrop=0;PluginPilot.Dispose();PluginPilot.ToggleContent();PluginPilot.LastDrop='';
            alert("Недостаточно места в рюкзаке. Автоподъем реса выключается. Не забудьте включить его после.");
            return;
        }
        var found=false;
        PluginFrame.$('table table td a',document.body).each(function(){
            if(this.href.indexOf('getitem')!=-1&&this.href.indexOf('#')==-1)
            {
                PluginPilot.LastDrop=PluginPilot.LastDrop+'  "'+PluginFrame.$(this).find("img")[0].alt+'"';
                window.location.href=this.href;
                found=true;
                return false;
            }
            else if(this.href.indexOf('sunduk=get')!=-1)
            {
                window.location.href=this.href;
                return false;
            }
			else if(this.href.indexOf('keybox=get')!=-1)
            {
                window.location.href=this.href;
                return false;
            }
            else if(this.href.indexOf('openbox=1')!=-1)
            {
                window.location.href=this.href;
                return false;
            }              
        });
        if(PluginPilot.LastDrop!=''&&!found)
        {
		var message=' В локации Y='+this.Me.x+" X="+this.Me.y+" подобрано "+PluginPilot.LastDrop;
	       	PluginPilot.DropLog.push(message);
	        PluginPilot.LastDrop=''
		var chat=top.frames["chat"].window;
		PluginFrame.$("#mes",chat.document.body).append("<font style='font-style:italic;font-size:9pt'>&nbspАвтодроп: "+message+"</font><br/>");
		chat.scrollBy(0,65000);
	}
    }
	this.TakeDropHill=function()
    {
        PluginFrame.$('table table td a',document.body).each(function(){
            if(this.href.indexOf('hill=1')!=-1)
            {
                window.location.href=this.href;
                return false;
            }              
        });
    }
	this.OpenDoorClick=function(keys_item)
    {
		PluginFrame.$('table table td font',document.body).each(function(){
			if (this.innerHTML.indexOf('У Вас нет подходящего Ключа')!=-1) {
				alert("Нет подходящего ключа");
				return false;
			}
		});
		PluginFrame.$('table table td a',document.body).each(function(){
			if ((this.href.indexOf('useitem=1')!=-1) || 
				(this.href.indexOf('useitem=2')!=-1) || 
				(this.href.indexOf('useitem=3')!=-1) || 
				(this.href.indexOf('useitem=4')!=-1))
            {	
				if (((this.href.indexOf('useitem=1')!=-1) && (keys_item == 1)) || 
				((this.href.indexOf('useitem=2')!=-1) && (keys_item == 2)) || 
				((this.href.indexOf('useitem=3')!=-1) && (keys_item == 3)) || 
				((this.href.indexOf('useitem=4')!=-1) && (keys_item == 4)))
            	{
					window.location.href=this.href;
                	return false;
            	} else {
					alert("Нет подходящего ключа");
					return false;
				}
			}
        });
    }
	this.OpenDoor=function()
    {
        var found=false;
	var This=this;
        PluginFrame.$('table table td a',document.body).each(function(){
            if(this.href.indexOf('useitem')!=-1)
            {
                found=true;
		if (PluginPilot.options.open_door_filter==1 && PluginPilot.options.open_door_filter_txt!='')
		{
		    var check = [[0,1],[0,-1],[1,0],[-1,0]], check1=[];
		    check1[1]=check1[0]=[[[0,1]],[[1,1],[2,1]],[[-1,1],[-2,1]]];
		    check1[3]=check1[2]=[[[1,0]],[[1,1],[1,2]],[[1,-1],[1,-2]]];

		    var this_x, this_y, type, this1_x, this1_y, foundMonstr='';
		    for (var i=0; i<check.length; i++)
		    {
			this_x=This.Me.x+check[i][0];
			this_y=This.Me.y+check[i][1];
			type=whoPoint(This.LabaMap.Points[This.LabaMap.PointsXY[this_x+','+this_y]].img);
			if(type=='dver') 
			{
			    Loop1:
			    for (var j=0; j<check1[i].length; j++)
				for (var k=0; k<check1[i][j].length; k++)
				{
				    this1_x=this_x+check1[i][j][k][0]*(check[i][0]!=0 ? check[i][0] : 1);
				    this1_y=this_y+check1[i][j][k][1]*(check[i][1]!=0 ? check[i][1] : 1);
				    type=whoPoint(This.LabaMap.Points[This.LabaMap.PointsXY[this1_x+','+this1_y]].img);
				    if (type=='stena')
					break;
				    else if (type=='monstr')
				    {
					foundMonstr=This.LabaMap.Points[This.LabaMap.PointsXY[this1_x+','+this1_y]].title;
					break Loop1;
				    }
				}
			}
		    }
		    {
			switch(foundMonstr)
			{
			case 'Опасная зона':
			  foundMonstr = '1';
			  break;
			case '':
			  foundMonstr = '0';
			  break;
			}
			var res = PluginPilot.options.open_door_filter_txt.match(RegExp('(?:^|,)(?:'+foundMonstr+')(?:,|$)', "i"));
			if(res&&res.length>0)
			{
			     found=false;
			}
		    }
		}
		if (found)
                    window.location.href=this.href;
                return false;
            }
        });
    }
    this.Hill=function()
    {
        var HP=1000000;
        var rhp = /Уровень жизни[\s\S]*?(\d+)\/(\d+)/mi;
        var res = PluginFrame.$('body',document).html().match(rhp);
        if(res&&res.length>0)
        {
             HP=res[1];if(HP==res[2])return;
        }
        else
        { alert('Ошибка определения уровня хп');return;}
		HP=parseInt(HP,10);
        if(HP<PluginPilot.options.labahill)
        {
            PluginFrame.$('table table td a',document.body).each(function(){
                if(this.href.indexOf('hill=1')!=-1)
                {
                    window.location.href=this.href;
                    return;
                }            
            });
        }
    }
    this.AutoAntidot=function()
    {
	var rtime = /Время перехода \+3 секунды.*?(?:Осталось:|Длительность:\+)([\d\.]+)мин/mi;
        var res = PluginFrame.$('body',document).html().match(rtime);
        if(res&&res.length>0)
        {
            rtime=parseInt(res[1],10);
	    if (rtime>=PluginPilot.options.autoantidot)
	    {
		PluginPilot.Heal('dot',false);
	    }
        }
    }
    this.Init=function()
    {
	var rmapid = /Карта:([\d]+)/mi;
        var res = PluginFrame.$('body',document).html().match(rmapid);
        if(res&&res.length>0)
        {
            var mapId=parseInt(res[1],10);
		}
        else
        { alert('Ошибка определения номера карты');return;}
	if (PluginFrame.$.jStorage.storageAvailable())
	{
	    if (mapId == PluginFrame.$.jStorage.get("MapID"))
	    {
		    var value = PluginFrame.$.jStorage.get("AutoMap");
		    var value2 = PluginFrame.$.jStorage.get("Map");
		    var value3 = PluginFrame.$.jStorage.get("BeHere");
			var value4 = PluginFrame.$.jStorage.get("Dealer");
			var value5 = PluginFrame.$.jStorage.get("MapRoad");
		    if (value)
		    {
			PluginPilot.AutoMap = PluginFrame.$.evalJSON(value);
		    }
		    if (value2)
		    {
			PluginPilot.Map = PluginFrame.$.evalJSON(value2);
		    }
		    if (value3)
		    {
			PluginPilot.BeHere = PluginFrame.$.evalJSON(value3);
		    }
			if (value4)
			{
			PluginPilot.Dealer = PluginFrame.$.evalJSON(value4);
			}
			if (value5)
			{
			PluginPilot.map_uz = PluginFrame.$.evalJSON(value5);
			}
	    }
	    else
	    {
	    	PluginPilot.Marshrut=[];
		PluginPilot.Map=[];
		PluginPilot.AutoMap=[];
		PluginPilot.BeHere=[];
		PluginPilot.map_uz=[];
	    }
	}
	var This=this;
if(document.body.innerHTML.indexOf('<center>nginx</center>')!=-1 || document.body.innerHTML.indexOf('Веб-страница недоступна')!=-1 )timeout_handle=setTimeout(function(){window.location.href=document.URL},5000);
	var X_max=25;
	var Y_max=25;
	if(document.URL.indexOf("/lab2.php")!=-1)
	{
		X_max=49;
		Y_max=49;
	}
	PluginFrame.Bind('keypress',window.document,LabaKeyPressed); 
        PluginFrame.Bind("focus",window,function(){PluginPilot.Focused()});
        PluginFrame.Bind("blur",window,function(){PluginPilot.Blured()});
		var exit_func=function(e){
		var PluginAutoUdar=null;
		if(PluginFrame!=null){
    		PluginFrame.$(PluginFrame.PM.plugins).each(function(){
        		if((this.id=="AutoUdar") || (this.id=="AutoUdarOld")){
	    			PluginAutoUdar=this;
				}
    		})
		}
		if(PluginAutoUdar.AutoBegin)
		{
			if(confirm('Вы выходите из лабиринта и у вас включен АвтоСтарт Автоудара. Выключить?'))
			{
				PluginAutoUdar.AutoBegin=false;
                PluginAutoUdar.options.auto=0;
				PluginAutoUdar.master.SaveOptions();
				if (PluginAutoUdar.id == "AutoUdar") {
					PluginFrame.$('#a_u_attack_auto').removeAttr('checked') ;
				} else {
					PluginFrame.$('#a_u_o_attack_auto').removeAttr('checked') ;
				}
			}
		}
		if(this.name=="exit"&&!confirm('Вы точно хотите выйти из лабиринта и потерять все?'))
		{
			if(e.preventDefault)
				e.preventDefault();
			else
				return false;
		}
	}
	if(!PluginPilot.options.auto_exit)
	{
		var exit=PluginFrame.$('input[name=exit]',document.body);
		if(exit.length==1)
		{
			PluginFrame.Bind('click',exit[0],exit_func);
		}
		exit=PluginFrame.$('input[name=exit_good]',document.body);
		if(exit.length==1)
		{
			PluginFrame.Bind('click',exit[0],exit_func);
		}
	}
        var rscoord = /координаты : X=(\d+).*?Y=(\d+)/mi;
        var res=document.body.innerHTML.match(rscoord);
        if(res&&res.length>2)
        {
            this.Me.y=parseInt(res[1],10);
            this.Me.x=parseInt(res[2],10);
			var map_uz_temp01 = this.Me.x;
			var map_uz_temp02 = this.Me.y;
			var map_uz_temp03 = map_uz_temp01.toString(10) + "," + map_uz_temp02.toString(10);
			if (PluginPilot.map_uz.length > 0) {
				var map_uz_temp04 = 0;
				for (i=0; i<PluginPilot.map_uz.length; i++) {
					var map_uz_temp05 = ";" + map_uz_temp03 + ";";
					if (PluginPilot.map_uz[i].indexOf(map_uz_temp05) != -1) {
						var map_uz_temp04 = 1;
						break;
					}
				}
				if (map_uz_temp04 == 0) {
					var map_uz_temp05 = PluginPilot.map_uz[PluginPilot.map_uz.length - 1];
					if (map_uz_temp05.length < 249) {
						PluginPilot.map_uz[PluginPilot.map_uz.length - 1] = map_uz_temp05 + ";" + map_uz_temp03 + ";";
					} else {
						PluginPilot.map_uz[PluginPilot.map_uz.length] = ";" + map_uz_temp03 + ";";
					}

				}
			} else {
				PluginPilot.map_uz[0] = ";" + map_uz_temp03 + ";";

			}
	    if (this.Me.x == 1 && document.URL.indexOf("/lab2.php")!=-1) {
		for (i=0; i<PluginPilot.Map.length; i++) {
			if (PluginPilot.Map[i].x==1 || PluginPilot.Map[i].y==1) {
				if (PluginPilot.Map[i].img=='http://i.oldbk.com/llabb/m.gif' || PluginPilot.Map[i].img=='http://i.oldbk.com/llabb/os.gif' || PluginPilot.Map[i].img=='http://i.oldbk.com/llabb/of.gif') {
					PluginPilot.Map=[];
					PluginPilot.AutoMap=[];
					PluginPilot.BeHere=[];
					PluginPilot.map_uz=[];
				}
				break;
			}
		}
	    }
	if (PluginPilot.AutoMap.length==0){
		var agr=[];
		for(var t=0;t<=X_max*(X_max+1);t++){
			PluginPilot.AutoMap.push(new WasPoint("",0,agr));
		}
	}
			if(PluginPilot.BeHere.length>0){
				if(PluginPilot.BeHere[PluginPilot.BeHere.length-1].x != this.Me.x || PluginPilot.BeHere[PluginPilot.BeHere.length-1].y !=this.Me.y ){
					PluginPilot.BeHere.push(new LabaPoint(2,"",this.Me.x,this.Me.y));
					}
			}else{
				PluginPilot.BeHere.push(new LabaPoint(2,"",this.Me.x,this.Me.y));
			}
			PluginPilot.AutoMap[this.Me.y * X_max+this.Me.x].was=1;
            this.LabaMap.me.x=this.Me.x;
            this.LabaMap.me.y=this.Me.y;
            if(PluginPilot.Marshrut.length>0)
            {
                PluginPilot.Marshrut[0].x=this.Me.x;
                PluginPilot.Marshrut[0].y=this.Me.y;
            }
            else
            {
                PluginPilot.Marshrut.push(new LabaPoint(2,"",this.Me.x,this.Me.y)); 
            }
        }
        else
        {
            alert('Ошибка определения ваших координат');
            return;
        }
{ 
        PluginFrame.$('table table table td>img',document.body).each(function(){
            This.LabaMap.AddPoint(this);
        });
        var i=0;
        PluginFrame.$('table table table td>img',document.body).each(function(){
	if(IsAllowed())
	{
	    var f=-1;
	    for(var j in PluginPilot.Map)
	    {
		if(PluginPilot.Map[j].x==This.LabaMap.Points[i].x&&PluginPilot.Map[j].y==This.LabaMap.Points[i].y)
		{
			f=j;
		}
	    }
	    if(f!=-1){
			PluginPilot.Map[f]=This.LabaMap.Points[i];
			PluginPilot.AutoMap[This.LabaMap.Points[i].y*X_max+This.LabaMap.Points[i].x].img=This.LabaMap.Points[i].img;			
	    }else{
			PluginPilot.Map.push(This.LabaMap.Points[i]);
			PluginPilot.AutoMap[This.LabaMap.Points[i].y*X_max+This.LabaMap.Points[i].x].img=This.LabaMap.Points[i].img;
		}
	}
            this.x1=This.LabaMap.Points[i].x;
            this.y1=This.LabaMap.Points[i].y;
            this.type1=This.LabaMap.Points[i].type;
            this.title=this.title+' X'+this.y1+'Y'+this.x1;
            this.id=this.x1+'_'+this.y1;
            if(this.type1!=0)
                PluginFrame.Bind("click",this,Pilot.SetGoTo);
            i++;
        });
}
			if (typeof(top.consoleRef)!='undefined') {
				if (typeof(top.consoleRef.name)!='undefined') {
					if (top.consoleRef.name == "map") {
						Pilot.ShowMap();
					}
				}
			}
	if (PluginFrame.$.jStorage.storageAvailable())
	{
	       var expire =  1000*60*60*24*30;
		PluginFrame.$.jStorage.set('AutoMap', PluginFrame.$.toJSON(PluginPilot.AutoMap), {TTL: expire});
		PluginFrame.$.jStorage.set('Map', PluginFrame.$.toJSON(PluginPilot.Map), {TTL: expire});
		PluginFrame.$.jStorage.set('BeHere', PluginFrame.$.toJSON(PluginPilot.BeHere), {TTL: expire});
		PluginFrame.$.jStorage.set('MapRoad', PluginFrame.$.toJSON(PluginPilot.map_uz), {TTL: expire});
		PluginFrame.$.jStorage.set('MapID', mapId, {TTL: expire});
	}
        if(PluginPilot.Marshrut.length>1)
        {
            var nearest=PluginPilot.Marshrut[1];
            if(nearest.x==this.Me.x&&nearest.y==this.Me.y)
            {
                PluginPilot.Marshrut.shift();
            }
            if(PluginPilot.Marshrut.length>1)
            {
                var Target=PluginPilot.Marshrut[PluginPilot.Marshrut.length-1];
                var img=document.getElementById(Target.x+'_'+Target.y);
                if(img)
                {
                    this.Previmg=img.src;
                    img.src=this.Newimg();
                }
            }
            else
            {
                PluginPilot.Stop();
            }
        }
        if(PluginPilot.options.autodrop==1)
        {
            this.TakeDrop();
        }
		if(PluginPilot.options.open_door==1)
        {
            this.OpenDoor();
        }
	var heroic=0;
        if(PluginPilot.options.real_start==1)
        { 
			heroic = Pilot.SetGoTo();
			this.timer=setTimeout(function(){PluginPilot.Begin();},500);
		}else{
		}
        this.Hill();
	if (PluginPilot.options.autoantidot>0)
	{
		this.AutoAntidot();
	}
        this.NextStep(false);  
    }
}
var Pilot=new AutoPilot();
Pilot.Init();
