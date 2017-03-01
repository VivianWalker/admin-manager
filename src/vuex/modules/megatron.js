import * as types from '../mutation-types';

const state = {
    loading: true,
    error: null,
    quotaNum: 0,
    vehicle: null,
    openid: null,
    ticket: null,
    scratch: 0,
    scratch2: 0,
}

const mutations = {
    [types.MEGATRON_REQUEST](state) {
        // state.ticket = null;
        state.loading = false;
    },
    [types.MEGATRON_SUCCESS](state, { vehicle, openid, ticket}) {
        state.loading = false;
        state.vehicle = vehicle;
        state.openid = openid.data;
        state.ticket = ticket;
        let r_date = null;
        let datestr = null;
        if (vehicle.data.register_date === undefined || vehicle.data.register_date === null) {
            if (vehicle.data.receipt_date !== null && vehicle.data.receipt_date !== undefined) {
                datestr = vehicle.data.receipt_date;
                
            }
        } else {
            r_date = vehicle.data.register_date;
            datestr = r_date.replace(/-/g, "/");
        }
        let price = vehicle.data.vehicle_model.purchasePriceTax;
        let currentDate = new Date();
        let registerDate = new Date(datestr);
        console.log("registerDate:====" +registerDate )
        let dates = currentDate.getTime() - registerDate.getTime();
        let months = Math.floor(dates / 24 / 3600 / 1000 / 30);
        state.quotaNum = ((1 - months * 0.006) * price).toFixed(2);

        let year = parseInt(months / 12);
        let price2 = parseInt(price / 100000);

        if (year < 2) {
            switch (price2) {
                case 0:
                    state.scratch = 202;
                    state.scratch2 = 303;
                    break;
                case 1:
                    state.scratch = 214;
                    state.scratch2 = 320;
                    break;
                case 2:
                    state.scratch = 249;
                    state.scratch2 = 374;
                    break;
                case 3:
                case 4:
                    state.scratch = 451;
                    state.scratch2 = 632;
                    break;
                default:
                    state.scratch = 742;
                    state.scratch2 = 1186;
                    break;
            }
        } else {
            switch (price2) {
                case 0:
                    state.scratch = 308;
                    state.scratch2 = 446;
                    break;
                case 1:
                    state.scratch = 326;
                    state.scratch2 = 472;
                    break;
                case 2:
                    state.scratch = 380;
                    state.scratch2 = 551;
                    break;
                case 3:
                case 4:
                    state.scratch = 694;
                    state.scratch2 = 972;
                    break;
                default:
                    state.scratch = 960;
                    state.scratch2 = 1535;
                    break;
            }
        }
    },
    [types.MEGATRON_FAILURE](state, { err }) {
        state.loading = false;
        state.error = err;
    }
};

export default {
    state,
    mutations
};