const generateCode = (digit) => {
    const max = Math.pow(10, digit) - 1;
    const min = Math.pow(10, digit - 1);
    const number = Math.floor(Math.random() * (max - min + 1) + min);
    return number;
}

module.exports = generateCode;