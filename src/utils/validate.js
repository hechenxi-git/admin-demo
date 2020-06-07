/**
 * 过滤特殊字符
 * @params string
 */
export const stripscript = (str) => {
    var pattern = new RegExp(" [`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 邮箱验证
 */
/* export const validateEmail = (str) => {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(str);
} */

/**
 * 密码验证
 */
export const validatePassword = (str)=>{
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(str) 
}

/**
 * 验证码
 */
export const validateCaptche = (str)=>{
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(str) 
}