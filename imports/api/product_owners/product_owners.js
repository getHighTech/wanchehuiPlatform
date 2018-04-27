//由于历史遗留原因，cards应当也是product的一员
import { Mongo } from 'meteor/mongo';

export const ProductOwners = new Mongo.Collection('product_owners');
