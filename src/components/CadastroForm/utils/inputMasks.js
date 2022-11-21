export function phoneMask (phone) {
    return phone.replace(/\D/g, '')
        .replace(/^(\d)/, '($1')
        .replace(/^(\(\d{2})(\d)/, '$1) $2')
        .replace(/(\d{4})(\d{1,5})/, '$1-$2')
        .replace(/(-\d{5})\d+?$/, '$1');
}

export function dateMask (date) {
    let v = date.replace(/\D/g,'').slice(0, 8);
    if (v.length >= 5) {
        return `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
    }
    else if (v.length >= 3) {
        return `${v.slice(0,2)}/${v.slice(2)}`;
    }
    return v
}