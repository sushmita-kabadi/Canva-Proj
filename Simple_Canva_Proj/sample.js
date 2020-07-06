var CGI_IP    =   'http://172.16.20.136';
var CGI_DIR   =   '/cgi-bin/sushmita/user_database/';


id=''
passwd=''
name=''
role=''
statuss=''
flag=1;

function send_ajax_request(cgi_file, post_data, succ_flag, callback, request_type, asyn){
        var xmlhttp = (window.XMLHttpRequest)?(new XMLHttpRequest({mozSystem: true})):(new ActiveXObject("Microsoft.XMLHTTP"));
        xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState ==4 && xmlhttp.status==200 && succ_flag == 1) {
                        var text        = xmlhttp.responseText;
                        var xml         = xmlhttp.responseXML;
                       try {var json    = JSON && JSON.parse(text) || eval(text); }
                       catch(e){ console.log("Error JSON.parse "+e) }
                       try
                            {
                                            var callfunc    = eval(callback);
                            }
                       catch(e)
                            {
                                 alert("Error while eval callback "+e.lineNumber+"==="+e)
                            }
          }
        }
        xmlhttp.open(request_type,cgi_file,asyn);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(post_data);
    }


