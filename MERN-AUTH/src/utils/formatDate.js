


const formatDate = (date) =>{
    const d = new Date(date);

    if(Number.isNaN(d.getTime())){
        throw new TypeError(`formatDate expect a valid date : ${date}`);
    }

    return d.toISOString()
}

export default formatDate;