export function format(num,dec=2){
    return (num).toLocaleString('en-US', {maximumFractionDigits:dec});
}
export function formatNumber(num,dec=2){
    let nu =new Number(num).toFixed(dec) ;
    return nu
}
export function formatyocto(num,dec=2){
    return (num / 10**24).toFixed(dec);
}

export function formatprice(num,num1){
    return (parseFloat(num) * parseFloat(num1));
}