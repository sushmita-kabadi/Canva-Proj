
function Utils(){
   this.Logger  = {
        push    :function(msg){
		    try{console.log((new Date())+" ==== "+msg);}catch(e){}
        }
   };  
   this.doc = document;
}
Utils.prototype.constructor	= Utils;
(function(){
    this.init = function(doc){
        this.doc = doc;
    }
    this.create_table = function(attr, parentElem){
        var tDOM        = this.createDOM("table",attr,parentElem);
        return tDOM;
    }
    this.get_table_row = function(table, row_attr, col_name, col_attr){
        var row = this.createDOM("tr", row_attr, table);
        for(var ind = 0, len = col_attr.length; ind < len; ind++){
                this.createDOM(col_name, col_attr[ind], row);
        }
        return row;
    }
    this.replace_dbl_quotes = function(str){
        	 var1 =  str.replace(/\"/g, '&quot;');
	        var1 = var1.replace(/\n\r?/g, '%0D%0A');
        	return var1;
    }
    this.fixedEncodeURIComponent	= function(str){
      	return encodeURIComponent(str).replace(/[!'():*'"–]/g, escape);
    }

    this.create_row_and_cols = function(tDOM, tag_name, attr, data){
        var row         = this.createDOM("tr",{},tDOM);
        for(var ind = 0, len =data.length; ind < len; ind++){
		switch(Object.prototype.toString.call(data[ind])){
                        case "[object Object]":
                                if('class' in data[ind] && 'class' in attr){
                                        attr['class']   =  attr['class']+" "+data[ind]['class'];
                                        delete data[ind]['class'];
                                }
                                for(var key in data[ind])
                                        attr[key]       = data[ind][key];
                                break;
                        default:
                                attr["txt"]     = data[ind];
                }
                this.createDOM(tag_name, attr,row)
        }

    }
    this.createDOM = this.createDom = function(elem, attributeJson, parentN){
	//alert(elem+'--------------'+attributeJson+'------------------'+parentN)
        var elemDom = parentN.ownerDocument.createElement(elem);
        this.setAttr(elemDom, attributeJson);
	    if(parentN)
        	    parentN.appendChild(elemDom);
        return elemDom;
    }
    this.insert_row_and_cols = function(tDOM, tag_name, attr, data, row_ind){
        var row         = this.insertDOM("tr",{},tDOM, row_ind);
        for(var ind = 0, len =data.length; ind < len; ind++){
		switch(Object.prototype.toString.call(data[ind])){
                        case "[object Object]":
                                if('class' in data[ind] && 'class' in attr){
                                        attr['class']   =  attr['class']+" "+data[ind]['class'];
                                        delete data[ind]['class'];
                                }
                                for(var key in data[ind])
                                        attr[key]       = data[ind][key];
                                break;
                        default:
                                attr["txt"]     = data[ind];
                }
                this.insertDOM(tag_name, attr,row, tDOM, row_ind)
        }
        return row;
    }
    this.insertAfter = function(newElement,targetElement){
        var parentnode = targetElement.parentNode;
        if(parentnode.lastchild == targetElement){
  		parentnode.appendChild(newElement);
	} else {
		parentnode.insertBefore(newElement, targetElement.nextSibling);
	}
    }
    this.insertDOM = function(elem, attributeJson, parentN, row_ind){
        var elemDom = parentN.ownerDocument.createElement(elem);
        this.setAttr(elemDom, attributeJson);
	    if(parentN){
		    parentN.insertBefore(elemDom, parentN.childNodes[row_ind]);
//        	    parentN.appendChild(elemDom);
	    }
        return elemDom;
    }
    this.Id = function(id, doc){
        if(doc) 
            return doc.getElementById(id);
        return this.doc.getElementById(id);
    }

    this.setAttr = function(elem, attr){
        if("txt" in attr){
                elem.innerHTML  = attr["txt"];
                delete attr["txt"];
        }
        for(var key in attr )
                elem.setAttribute(key, attr[key]);
    }
    this.send_ajax_request = function(cgi_file, post_data, succ_flag, callback, request_type, asyn){
        var xmlhttp = (window.XMLHttpRequest)?(new XMLHttpRequest({mozSystem: true})):(new ActiveXObject("Microsoft.XMLHTTP"));
        xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState ==4 && xmlhttp.status==200 && succ_flag == 1) {
                        var text        = xmlhttp.responseText;
                        var xml         = xmlhttp.responseXML;
                        try{var json    = JSON && JSON.parse(text) || eval(text);}catch(e){console.log("Error JSON.parse "+e);}
                        try{
				            var callfunc    = eval(callback);
			            }catch(e){
				            alert("Error while eval callback "+e.lineNumber+"==="+e)
			            }
                }
        }
        xmlhttp.open(request_type,cgi_file,asyn);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(post_data);
    }
    this.disp_none = function(elem){
	    if(elem)
		    elem.style.display	= 'none';
    }
    this.disp_block = function(elem){
	    if(elem)
		    elem.style.display	= 'block';
    }
    this.Log = function(msg){
        try{console.log(msg)}catch(e){};
    } 
    this.remove_node = function(elem){
	    try{elem.parentNode.removeChild(elem);}catch(e){}
    }
    this.get_page_size = function(doc){
        var maxH 	= Math.max( Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight), Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight), Math.max(doc.body.clientHeight, doc.documentElement.clientHeight));
        var maxW 	= Math.max( Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth), Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth), Math.max(doc.body.clientWidth, doc.documentElement.clientWidth));
	    return {pw : maxW, ph : maxH};
    }
    this.get_absolute_pos = function( obj) {
        var cur_left = 0,cur_top = 0;
        if(obj.offsetLeft) cur_left += parseInt(obj.offsetLeft);
        if(obj.offsetTop) cur_top += parseInt(obj.offsetTop);
        if(obj.scrollTop && obj.scrollTop > 0) cur_top -= parseInt(obj.scrollTop);
        if(obj.offsetParent) {
            var pos     = this.get_absolute_pos(obj.offsetParent);
            cur_left    += pos[0];
            cur_top     += pos[1];
        } else if(obj.ownerDocument) {
            var window_obj  = obj.ownerDocument.defaultView;
            if(!window_obj && obj.ownerDocument.parentWindow) window_obj = obj.ownerDocument.parentWindow;
            if(window_obj)
                if(window_obj.frameElement) {
                    var pos     = this.get_absolute_pos(window_obj.frameElement);
                    cur_left    += pos[0];
                    cur_top     += pos[1];
                }
        }
        return [cur_left,cur_top];
    }
    this.show_process_bar = function()
    {
        if (this.Id('ajax_process')){
            this.Id('ajax_process').style.display = 'block';
        }
        if (this.Id('process_png')){
            this.Id('process_png').style.display = 'block';
        }
        if (this.Id('process_div_rnd'))
	        this.Id('process_div_rnd').style.display = 'block';
//   	    this.doc.body.scrollTop = 0;
    }
    this.hide_process_bar_new = function(){
        if (this.Id('ajax_process').style.display == 'block'){
            this.Id('ajax_process').style.display = 'none';
        }
    }
    this.hide_process_bar = function(feedback)
    {
        if (this.Id('ajax_process')){
            this.Id('ajax_process').style.display = 'none';
        }
        if (this.Id('process_div_rnd')){
            this.Id('process_div_rnd').style.display = 'none';
        }
        if (this.Id('process_png')){
           this.Id('process_png').style.display = 'none';
        }
        if (this.Id('feedBackPopUP') && !!feedback){
		this.feedBackPopUP(feedback);
	}
    }
    this.feedBackPopUP = function(text){
        this.Id('feedBackSpan').innerHTML = text;
        this.Id('feedBackPopUP').style.display = 'block';
        $('#feedBackPopUP').delay(1000).fadeOut(2000);
    }
    this.dump_json_data = function(json){
	    try{this.Logger.push("DUMPING JSON === "+JSON.stringify(json, null, '\t'));}catch(e){this.Logger.push("Error : DUMPING JSON === "+json);}
    }
    this.loadJS = function(src, callback) {
        var s = this.doc.createElement('script');
        s.src = src;
        s.async = true;
        s.onreadystatechange = s.onload = function() {
            var state = s.readyState;
            if (!callback.done && (!state || /loaded|complete/.test(state))) {
                callback.done = true;
                callback();
            }
        };
        this.doc.getElementsByTagName('head')[0].appendChild(s);
    }
    this.getQuerystring = function(key, default_)
    {
	if (default_==null) default_="";
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null)
		return default_;
	else
		return qs[1];
    }
}).apply(Utils.prototype);
utls = new Utils();





var CGI_IP      = 'http://172.16.20.218/';
var CGI_DIR     = 'cgi-bin/AutoToc_Precision_Recall_document_user_data_sushmita/';
//var CGI_DIR     = 'cgi-bin/sushmita/';

prev1 = ''
var box=[]
function send_ajax_request(cgi_file, post_data, succ_flag, callback, request_type, asyn){
        var xmlhttp = (window.XMLHttpRequest)?(new XMLHttpRequest({mozSystem: true})):(new ActiveXObject("Microsoft.XMLHTTP"));
        xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState ==4 && xmlhttp.status==200 && succ_flag == 1) {
                        var text        = xmlhttp.responseText;
                        var xml         = xmlhttp.responseXML;
                        try{var json    = JSON && JSON.parse(text) || eval(text);}catch(e){console.log("Error JSON.parse "+e);}
                        try{
                                            var callfunc    = eval(callback);
                                    }catch(e){
                                            alert("Error while eval callback "+e.lineNumber+"==="+e)
                                    }
                }
        }
        xmlhttp.open(request_type,cgi_file,asyn);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(post_data);
    }

function load_pages()
{
	var vservice_path       = CGI_IP + CGI_DIR + 'load_bboxes.py?input_str=';
        var vret_str            = {};
        var strURL              = vservice_path  + JSON.stringify(vret_str);
        console.log('CGI Restore MetaData ===>>>>'+strURL);
        send_ajax_request(strURL, null, 1,"display_bboxes(json)", "POST", false);

}

function display_bboxes(result)
{
	var text=JSON.stringify(result['Content'])
	var text1 = JSON.parse(text)
	var HR = []
	var VR = []
	var HR_VR = []
	
	for(i=0;i<text1.length;i++)
	{
		for (j = 0 ; j<text1[i].length ; j++)
		{
			if(i == 0)
			{
				HR.push(text1[i][j])
			}
			if(i==1)
			{
				VR.push(text1[i][j])
			}	
			if(i==2)
			{
				HR_VR.push(text1[i][j])
			}
		}
	}
	
        var sel = document.getElementById("hr");
        var blank = document.createElement("option");
        for(i=0;i<HR.length;i++)
        {
              var opt = HR[i];
		{
              var el = document.createElement("option");
              el.textContent = opt;
              el.value = opt;
              sel.appendChild(el)
		}

            }

        var sel = document.getElementById("vr");
        var blank = document.createElement("option");

        for(i=0;i<VR.length;i++)
        {
              var opt = VR[i];
	     {
              var el = document.createElement("option");
              el.textContent = opt;
              el.value = opt;
              sel.appendChild(el)
             }

            }
	
        var sel = document.getElementById("hr_vr");
        var blank = document.createElement("option");
        for(i=0;i<HR_VR.length;i++)
        {
              var opt = HR_VR[i];
	     {
              var el = document.createElement("option");
              el.textContent = opt;
              el.value = opt;
              sel.appendChild(el)
		}

            }
}

function doc_page_img(){
	document.getElementById('bigpic').innerHTML='';
	var url = location.href;
	var url_split = url.split('?')
	url_doc_pg = url_split[1].toString()
	var URL = url_doc_pg.split('&')
	var doc = URL[0].split('=')
	var pg = URL[1].split('=')
	var doc_id = doc[1]
	var p_no = pg[1]
	var vservice_path       = CGI_IP + CGI_DIR + 'Select_img_doc_page.py?input_str=';
	var vret_str            = {'doc_id':doc_id,'p_no':p_no};
        var strURL              = vservice_path  + JSON.stringify(vret_str);
        console.log('CGI Restore MetaData ===>>>>'+strURL);
        send_ajax_request(strURL, null, 1,"displayBatchId(json)", "POST", false);

	
}

function displayBatchId(result){
	document.getElementById('bigpic').innerHTML='';
	document.getElementById('show_val_pop_c').innerHTML='';
	//document.getElementById('bigpic').innerHTML='';
	var text=JSON.stringify(result['Content'])
        var javascriptObject = JSON.parse(text)
	var tableData="";
	bboxes=[]
	for(i=0;i<javascriptObject.length;i++)
	{
			//alert(javascriptObject[i])
			bboxes.push(javascriptObject[i][7])
			box.push(javascriptObject[i][7])
			var doc_id = javascriptObject[i][0]
			var page_no = javascriptObject[i][1]
			var j = i+1	
			tableData+='<tr id="'+javascriptObject[i][7]+'" onclick=highlight('+j+','+doc_id+','+page_no+') class="ng-scope"><td class="taxonomy_data_td_cls">'+javascriptObject[i][0]+'</td><td class="taxonomy_data_td_cls">'+javascriptObject[i][1]+'</td><td class="taxonomy_data_td_cls" >'+javascriptObject[i][2]+'</td><td class="taxonomy_data_td_cls")">'+javascriptObject[i][3]+'</td><td class="taxonomy_data_td_cls">'+javascriptObject[i][4]+'</td><td class="taxonomy_data_td_cls">'+javascriptObject[i][5]+'</td><td class="taxonomy_data_td_cls">'+javascriptObject[i][6]+'</td><td class="taxonomy_data_td_cls">'+javascriptObject[i][8]+'</td></tr>'
	}
		document.getElementById("tb").innerHTML = tableData;
		$(function(){
  		$("tr").each(function(){
    		var col_val = $(this).find("td:eq(6)").text();
    		var col_val1 = $(this).find("td:eq(0)").text();
    		//var col_val = $(this).find("td:eq(6)").value();
    		if(col_val1 == ""){
			$(this).addClass('nocons');
		}
    		else if (col_val == "g"){
      			$(this).addClass('selected');  //the selected class colors the row green//
    		}
		else if(col_val =="r"){
			$(this).addClass('bad');  //the selected class colors the row green//
                }
		//else if(col_val=="Sys_green"){
		//	$(this).addClass('nocons');
		//} 
		else {
      		$(this).addClass('nan');
    		}
  		});
		});
		var container   = document.getElementById('show_val_pop_c');
		//alert(container)
	        //var mDiv        = utls.createDOM("div",{'style':'display:table-cell; vertical-align:middle;','border':'#ff0 2px none','id':'image_container_'+page_no},container);
	        var mDiv        = utls.createDOM("div",{'style':'display:table-cell; vertical-align:middle;','border':'#ff0 2px none','id':'image_container_'+page_no},container);
        	//var  vcanv_img       = utls.createDOM("canvas",{'width':'1500','height':'1500', 'border':'#ff0 2px solid', 'class':'cs_canv_img', 'id':'bigpic'},mDiv);
        	var  vcanv_img       = utls.createDOM("canvas",{'width':'1000','height':'855', 'border':'#ff0 2px solid', 'class':'cs_canv_img', 'id':'bigpic'},mDiv);
        	var ctx_img         = vcanv_img.getContext('2d');
        	var img = new Image();
                alert("alert::::::"+img.onload)
        	img.onload = function(){
            	ctx_img.width = img.width;
            	ctx_img.height = img.height;
                alert(img.width+" "+img.height)
            	ctx_img.drawImage(img,0,0);
		for(i=0;i<bboxes.length;i++)
		{
			if(bboxes[i]==null)
			{
				continue
			}
			else{
				var bb = bboxes[i].split('_')
                        	ctx_img.beginPath();
                        	ctx_img.rect(bb[0],bb[1],bb[2],bb[3]);
                        	//ctx_img.fillStyle = "rgba(124,240,10,0.5)";
                        	//ctx_img.fillStyle = "rgba(124,240,10,0.5)";
                        	//ctx_img.fill();
                        	ctx_img.lineWidth = 1;
                        	ctx_img.strokeStyle = 'red';
                        	ctx_img.stroke();
				}
		}

        }
        console.log('t :;;;;;;;;;;;'+ "/INFOSIEVE_PROJECTS/AUTO_TOC/output/"+doc_id+"/image/"+doc_id+"-page-"+page_no+".png")
        //console.log('t :;;;;;;;;;;;'+"/INFOSIEVE_PROJECTS/233_4TB/AUTO_TOC/output/"+doc_id+"/image/"+doc_id+"-page-"+page_no+".png")
	img.src = "/INFOSIEVE_PROJECTS/AUTO_TOC/output/"+doc_id+"/image/"+doc_id+"-page-"+page_no+".png";
	//img.src = "/INFOSIEVE_PROJECTS/233_4TB/AUTO_TOC/output/"+doc_id+"/image/"+doc_id+"-page-"+page_no+".png";
	}


function back(){
	alert("hi")
	//window.location.replace("AutoToc_Precision_Recall.html")
	window.location.href = "http://172.16.20.218/AutoToc_Precision_Recall_document_sushmita/AutoToc_Precision_Recall.html"
}
function highlight(bbox){
	document.getElementById("show_val_pop_c").innerHTML="";
	var container   = document.getElementById('show_val_pop_c');
        var mDiv        = utls.createDOM("div",{'style':'display:table-cell; vertical-align:middle;','border':'#ff0 2px none'},container);
        //var  vcanv_img       = utls.createDOM("canvas",{'width':'1200','height':'855', 'border':'#ff0 2px solid', 'class':'cs_canv_img', 'id':'hr'},mDiv);
        var  vcanv_img       = utls.createDOM("canvas",{'width':'1200','height':'1000', 'border':'#ff0 2px solid', 'class':'cs_canv_img', 'id':'hr'},mDiv);
        var ctx_img         = vcanv_img.getContext('2d');
	var img = new Image();
        img.onload = function(){
            ctx_img.width = img.width;
            ctx_img.height = img.height;
            ctx_img.drawImage(img,0,0);
                        	var bb = bbox.split(',')

                        	ctx_img.beginPath();
                        	ctx_img.rect(bb[0],bb[1],bb[2],bb[3]);
                        	ctx_img.fillStyle = "rgba(124,240,10,0.5)";
                        	ctx_img.fill();
                        	ctx_img.lineWidth = 1;
                        	ctx_img.strokeStyle = 'red';
                        	ctx_img.stroke();
        }

       img.src = "39_61_3-page-1.png"
}

function get_bbox_hr()
{
	var bbox = document.getElementById('hr').value;
	highlight(bbox)
}

function  get_bbox_vr()
{
	var bbox = document.getElementById('vr').value;
	highlight(bbox)

}

function get_bbox_hr_vr()
{
	var bbox = document.getElementById('hr_vr').value;
	highlight(bbox)

}

