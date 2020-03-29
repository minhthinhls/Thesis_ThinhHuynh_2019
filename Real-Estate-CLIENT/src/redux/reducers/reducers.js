import {CHANGE_CURRENCY_UNIT, CHANGE_AREA_UNIT} from '../actions/actions';

const initialState = {
  unitCurrency: "ETH",
  unitArea: "m^2"
};

function rootReducer(previousState = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENCY_UNIT:
      return {
        ...previousState,
        unitCurrency: action.unitCurrency
      };
    case CHANGE_AREA_UNIT:
      return {
        ...previousState,
        unitArea: action.unitArea
      };
    default:
      return previousState;
  }
}

export default rootReducer;
