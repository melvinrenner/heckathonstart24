module.exports = () => {
    const enums = {};
    enums.salutation = require("./salutation.enum")();
    return enums;
}  