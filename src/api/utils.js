
export const dictLabel = (datas, value) => {
    // console.log('datas', datas);
    // console.log('value', value);


    if (value === undefined) {
        return '';
    }
    for (let i in datas) {
        if (datas[i].value === value) {
            return datas[i].label;
        }
    }
    return '';
}