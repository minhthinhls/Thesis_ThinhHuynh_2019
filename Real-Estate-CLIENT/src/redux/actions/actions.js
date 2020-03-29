export const CHANGE_CURRENCY_UNIT = 'CHANGE_CURRENCY_UNIT';
export const CHANGE_AREA_UNIT = 'CHANGE_AREA_UNIT';

export function changeCurrencyUnit(unit) {
  return {type: CHANGE_CURRENCY_UNIT, unitCurrency: unit};
}

export function changeAreaUnit(unit) {
  return {type: CHANGE_AREA_UNIT, unitArea: unit};
}
