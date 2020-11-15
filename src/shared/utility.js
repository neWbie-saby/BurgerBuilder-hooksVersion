export const checkIfValid = (inpValue, rules) => {
    let check = true;
    inpValue = inpValue.trim();
    if(rules.required)
        check = inpValue !== '';

    if(rules.minLength)
        check = inpValue.length >= rules.minLength;
    
    if(rules.maxLength)
        check = inpValue.length <= rules.maxLength && check;

    if(rules.isEmail){
        const pattern = /\S+@\S+\.\S+/;
        check = pattern.test(inpValue) && check;
    } 

    return check;
};