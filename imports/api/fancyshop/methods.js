import { Meteor } from 'meteor/meteor';
import { Products } from '../products/products.js';
import { Shops} from '../shops/shops.js';


Meteor.methods({
    'fancyshop.home'(){
        let products = Products.find({name_zh: {$in: ["万人车汇黑卡", "VIRIDI"]}}).fetch();
        let card = Products.findOne({name_zh: "万人车汇黑卡"});
        console.log(products);
        return {
            products, 
            card,
            fromMethod: "fancyshop.home"
        }
    }
});