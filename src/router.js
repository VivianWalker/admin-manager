import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Index from './views/Index.vue'; 
import QuotationList from './views/QuotationList.vue';   
import OrderList from './views/OrderList.vue';  
import QuotationDetails from './views/QuotationDetails.vue';   
import OrderDetails from './views/OrderDetails.vue';
import Quotation from './views/Quotation.vue';   
import FinanceList from './views/FinanceList.vue';   
import Ok from './views/Ok.vue'; 

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/QuotationList', name: 'QuotationList', component: QuotationList },
    { path: '/QuotationDetails', name: 'QuotationDetails', component: QuotationDetails },
    { path: '/Quotation', name: 'Quotation', component: Quotation },
    { path: '/Ok', name: 'Ok', component: Ok },
    { path: '/OrderList', name: 'OrderList', component: OrderList },
    { path: '/OrderDetails', name: 'OrderDetails', component: OrderDetails },
    { path: '/FinanceList', name: 'FinanceList', component: FinanceList },
    { path: '*', redirect: '/' }
  ]
});
