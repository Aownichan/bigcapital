import { AppToaster } from 'components';
import { Intent } from '@blueprintjs/core';
import moment from 'moment';
import intl from 'react-intl-universal';
import * as R from 'ramda';
import {
  defaultFastFieldShouldUpdate,
  transformToForm,
  repeatValue,
  ensureEntriesHasEmptyLine,
  orderingLinesIndexes
} from 'utils';

const ERROR = {
  EXPENSE_ALREADY_PUBLISHED: 'EXPENSE.ALREADY.PUBLISHED',
  ENTRIES_ALLOCATED_COST_COULD_NOT_DELETED:
    'ENTRIES_ALLOCATED_COST_COULD_NOT_DELETED',
};

// Transform API errors in toasts messages.
export const transformErrors = (errors, { setErrors }) => {
  const hasError = (errorType) => errors.some((e) => e.type === errorType);

  if (hasError(ERROR.EXPENSE_ALREADY_PUBLISHED)) {
    setErrors(
      AppToaster.show({
        message: intl.get('the_expense_is_already_published'),
      }),
    );
  }
  if (hasError(ERROR.ENTRIES_ALLOCATED_COST_COULD_NOT_DELETED)) {
    setErrors(
      AppToaster.show({
        intent: Intent.DANGER,
        message: 'ENTRIES_ALLOCATED_COST_COULD_NOT_DELETED',
      }),
    );
  }
};

export const MIN_LINES_NUMBER = 4;

export const defaultExpenseEntry = {
  amount: '',
  expense_account_id: '',
  description: '',
  landed_cost: 0,
};

export const defaultExpense = {
  payment_account_id: '',
  beneficiary: '',
  payment_date: moment(new Date()).format('YYYY-MM-DD'),
  description: '',
  reference_no: '',
  currency_code: '',
  publish: '',
  categories: [...repeatValue(defaultExpenseEntry, MIN_LINES_NUMBER)],
};

/**
 * Transformes the expense to form initial values in edit mode.
 */
export const transformToEditForm = (
  expense,
  defaultExpense,
  linesNumber = 4,
) => {
  const expenseEntry = defaultExpense.categories[0];
  const initialEntries = [
    ...expense.categories.map((category) => ({
      ...transformToForm(category, expenseEntry),
    })),
    ...repeatValue(
      expenseEntry,
      Math.max(linesNumber - expense.categories.length, 0),
    ),
  ];
  const categories = R.compose(
    ensureEntriesHasEmptyLine(MIN_LINES_NUMBER, expenseEntry),
  )(initialEntries);

  return {
    ...transformToForm(expense, defaultExpense),
    categories,
  };
};

/**
 * Detarmine cusotmers fast-field should update.
 */
export const customersFieldShouldUpdate = (newProps, oldProps) => {
  return (
    newProps.customers !== oldProps.customers ||
    defaultFastFieldShouldUpdate(newProps, oldProps)
  );
};

/**
 * Detarmine accounts fast-field should update.
 */
export const accountsFieldShouldUpdate = (newProps, oldProps) => {
  return (
    newProps.accounts !== oldProps.accounts ||
    defaultFastFieldShouldUpdate(newProps, oldProps)
  );
};


/**
 * Filter expense entries that has no amount or expense account.
 */
export const filterNonZeroEntries = (categories) => { 
  return categories.filter(
    (category) => category.amount && category.expense_account_id,
  );
}

/**
 * Transformes the form values to request body.
 */
export const transformFormValuesToRequest = (values) => {
  const categories = filterNonZeroEntries(values.categories);

  return {
    ...values,
    categories: R.compose(orderingLinesIndexes)(categories),
  };
};