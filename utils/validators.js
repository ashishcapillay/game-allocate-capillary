const _ = require("lodash");
const { GAME_VALIDATE_PARAMS } = require("./constant");
module.exports = {
    customFieldModifiy: (trxRes) => {
        if(trxRes && !_.isEmpty(trxRes) && trxRes.response){
            const customFields = trxRes.response?.transactions?.transaction?.[0]?.custom_fields;
            if (!customFields.field?.length){
                Object.assign(customFields.field, GAME_VALIDATE_PARAMS.TRX_DEFAULT_RESPONSE_CF);
            }
            return customFields.field ? customFields.field.reduce((accum, field) => {
                let fieldName = field.name == "sku_code" ? "skuCode" : (field.name == "cluster_name" ? "clusterName" : field.name);
                accum[fieldName] = field.value;
                return accum;
            }, {}) : {};
        }
    },

    lineItemsSKUFilter: (trxRes) => {
        const skuItemCodeQty = [];
        const lineItemsVal = trxRes.response?.transactions?.transaction?.[0]?.line_items;
        if(lineItemsVal && lineItemsVal?.line_item?.length){
            // Updating the item_code value to skuCode for Demo:
            lineItemsVal.line_item.forEach((v, index) => {
                Object.assign(v, {item_code: GAME_VALIDATE_PARAMS.TRX_SKUS[index]});
            });
            lineItemsVal.line_item.forEach((e) => {
                skuItemCodeQty.push({
                    skuItemCode: e.item_code,
                    quantity: e.qty
                });
            })
        }
        return skuItemCodeQty ?? [];
    },

    lineItemsSKUMatch: (lineItems, dbRes) => {
        const skuMacthed = lineItems.filter((v) => {
            return v.skuItemCode == dbRes.skuCode
        });
        return !_.isEmpty(skuMacthed) ? skuMacthed?.[0]?.quantity : 0;
    }
}