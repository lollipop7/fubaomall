$('.selectpicker').selectpicker();

$('#inputAccount').blur(function(){
    var regMail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    var regTel = new RegExp("^^[1]{1}[3,4,5,8]{1}[0-9]{9}$")
    var account = this.value;
    if(account !== '') {
        return false;
    }else if (!regMail.test(account)){
        return false;
    }else if(!regTel.test(account)){
        return false;
    }else{
        return true;
    }
})

$('#transferMoney').keyup(function(e){
    amount(this)
}).blur(function(e){
    overFormat(this)
})
/**  
* 实时动态强制更改用户录入  
* arg1 inputObject  
**/  
function amount(th){  
    var regStrs = [  
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0  
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点  
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点  
        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上  
    ];  
    for(var i=0; i<regStrs.length; i++){  
        var reg = new RegExp(regStrs[i][0]);  
        th.value = th.value.replace(reg, regStrs[i][1]);  
    }  
}  

/**  
* 录入完成后，输入模式失去焦点后对录入进行判断并强制更改，并对小数点进行0补全  
* arg1 inputObject  
**/  
function overFormat(th){ 
    var v = th.value;  
    if(v === ''){  
        v = '0.00';  
    }else if(v === '0'){  
        v = '0.00';  
    }else if(v === '0.'){  
        v = '0.00';  
    }else if(/^0+\d+\.?\d*.*$/.test(v)){  
        v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');  
        v = inp.getRightPriceFormat(v).val;  
    }else if(/^0\.\d$/.test(v)){  
        v = v + '0';  
    }else if(!/^\d+\.\d{2}$/.test(v)){  
        if(/^\d+\.\d{2}.+/.test(v)){  
            v = v.replace(/^(\d+\.\d{2}).*$/, '$1');  
        }else if(/^\d+$/.test(v)){  
            v = v + '.00';  
        }else if(/^\d+\.$/.test(v)){  
            v = v + '00';  
        }else if(/^\d+\.\d$/.test(v)){  
            v = v + '0';  
        }else if(/^[^\d]+\d+\.?\d*$/.test(v)){  
            v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');  
        }else if(/\d+/.test(v)){  
            v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');  
            ty = false;  
        }else if(/^0+\d+\.?\d*$/.test(v)){  
            v = v.replace(/^0+(\d+\.?\d*)$/, '$1');  
            ty = false;  
        }else{  
            v = '0.00';  
        }  
    }  
    th.value = v;   
} 

$('#payoffModal').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget); // Button that triggered the modal
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var payoffModal = $(this);
    $('#confirm-btn').click(function(){
        // TODO: 发送ajax
        // success
        var ajaxrst = false;
        if (ajaxrst) {
            payoffModal.modal('hide');
            $('#payoffModal').on("hidden.bs.modal", function(){
                $("#payoffSuccModal").modal('show');
                
            })
        } else {
            payoffModal.modal('hide');
            $('#payoffModal').on("hidden.bs.modal", function(){
                $("#payoffFailModal").modal('show');
                
            })
        }
    })
})
$("#payoffSuccModal").on('show.bs.modal', function(event){
    $('#succ-btn').click(function(){
        $("#payoffSuccModal").modal('hide');
    })
})
$("#payoffFailModal").on('show.bs.modal', function(event){
    $('#fail-btn').click(function(){
        $("#payoffFailModal").modal('hide');
    })
})