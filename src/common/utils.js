//防抖功能的函数封装！！！

export function debounce (func,delay){//参数是要进行防抖的函数及定时器的时间
    let timer=null
    return function (...args){//传递不止一个参数的数组形式
        if (timer) clearTimeout(timer)//1.加载完图片，清除定时，再继续加载图片，接着又清除定时
        timer=setTimeout(()=>{//2.最后一次加载完，走完定时时间，执行refresh（）
            func.apply(this,args)//this指向return的那个函数
        },delay)//使用function.apply()解决this指向和接收参数形式的问题
    }
}

// 定义时间戳的方法
export function formatDate(date,fmt){
    // 获取年份
    if(/(y+)/.test(fmt)){//在正则规则下匹配传过来的年份格式(一个或多个)
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+' ').substr(4-RegExp.$1.length))
        //匹配过来的格式替换获取的年份数据格式
    }
    //获取月日时分秒
    let o={
        'M+':date.getMonth()+1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
    }
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            let str=o[k]+' ';
            fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
        }
    }
    return fmt
    //小算法：裁剪字符串，使得格式为00:00:00
    function padLeftZero(str){
        return ('00'+str).substr(str.length)
    }
}