import { useMutation, useQueryClient } from 'react-query';
import { useRequestQuery } from '../useQueryRequest';
import useApiRequest from '../useRequest';
import { useSetSettings } from 'hooks/state';
import t from './types';

/**
 * Saves the settings.
 */
export function useSaveSettings(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();

  return useMutation((settings) => apiRequest.post('settings', settings), {
    onSuccess: () => {
      queryClient.invalidateQueries(t.SETTING);
    },
    ...props,
  });
}

function useSettingsQuery(key, query, props) {
  const setSettings = useSetSettings();

  return useRequestQuery(
    key,
    { method: 'get', url: 'settings', params: query },
    {
      select: (res) => res.data.settings,
      defaultData: [],
      onSuccess: (settings) => {
        setSettings(settings);
      },
      ...props,
    },
  );
}

/**
 * Retrieve the all settings of the organization.
 */
export function useSettings() {
  return useSettingsQuery([t.SETTING, 'ALL'], {});
}

/**
 * Retrieve invoices settings.
 */
export function useSettingsInvoices(props) {
  return useSettingsQuery(
    [t.SETTING, t.SETTING_INVOICES],
    { group: 'sale_invoices' },
    props,
  );
}

/**
 * Retrieve invoices settings.
 */
export function useSettingsEstimates(props) {
  return useSettingsQuery(
    [t.SETTING, t.SETTING_ESTIMATES],
    { group: 'sale_estimates' },
    props,
  );
}

/**
 * Retrieve payment receives settings.
 */
export function useSettingsPaymentReceives(props) {
  return useSettingsQuery(
    [t.SETTING, t.SETTING_PAYMENT_RECEIVES],
    { group: 'payment_receives' },
    props,
  );
}

/**
 * Retrieve sale receipts settings.
 * @param {*} props
 */
export function useSettingsReceipts(props) {
  return useSettingsQuery(
    [t.SETTING, t.SETTING_RECEIPTS],
    { group: 'sale_receipts' },
    props,
  );
}

/**
 * Retrieve sale receipts settings.
 * @param {*} props
 */
export function useSettingsManualJournals(props) {
  return useSettingsQuery(
    [t.SETTING, t.SETTING_MANUAL_JOURNALS],
    { group: 'sale_receipts' },
    props,
  );
}

/**
 * Retrieve sale receipts settings.
 * @param {*} props
 */
export function useSettingsItems(props) {
  return useSettingsQuery(
    [t.SETTING, t.SETTING_ITEMS],
    { group: 'items' },
    props,
  );
}

/**
 * Retrieve cashflow settings.
 */
export function useSettingCashFlow(props) {
  return useSettingsQuery(
    [t.SETTING, t.SETTING_CASHFLOW],
    { group: 'cashflow' },
    props,
  );
}

/**
 * Retrieve SMS Notifications settings.
 */
export function useSettingSMSNotifications(props) {
  return useRequestQuery(
    [t.SETTING_SMS_NOTIFICATIONS],
    { method: 'get', url: `settings/sms-notifications` },
    {
      select: (res) => res.data.notifications,
      defaultData: [],
      ...props,
    },
  );
}

/**
 * Retrieve Specific SMS Notification settings.
 */
export function useSettingSMSNotification(key, props) {
  return useRequestQuery(
    [t.SETTING_SMS_NOTIFICATIONS, key],
    {
      method: 'get',
      url: `settings/sms-notification/${key}`,
    },
    {
      select: (res) => res.data.notification,
      defaultData: {
        smsNotification: [],
      },
      ...props,
    },
  );
}

/**
 * Retrieve Edit SMS Notification settings.
 */
export function useSettingEditSMSNotification(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();

  return useMutation(
    (values) => apiRequest.post(`settings/sms-notification`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([t.SETTING_SMS_NOTIFICATIONS]);

        queryClient.invalidateQueries(t.SALE_INVOICE_SMS_DETAIL);
        queryClient.invalidateQueries(t.SALE_RECEIPT_SMS_DETAIL);
        queryClient.invalidateQueries(t.PAYMENT_RECEIVE_SMS_DETAIL);
        queryClient.invalidateQueries(t.SALE_ESTIMATE_SMS_DETAIL);
      },
      ...props,
    },
  );
}


/**
 * Retrieve EasySMS Integration settings.
 */
export function useSettingEasySMSIntegrate(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();

  return useMutation(
    (values) => apiRequest.post(`settings/easysms/integrate`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([t.SETTING_EASY_SMS]);
        queryClient.invalidateQueries([t.SETTING_SMS_NOTIFICATIONS]);
      },
      ...props,
    },
  );
}

/**
 * Retrieve EasySMS Disconnect settings.
 */
export function useSettingEasySMSDisconnect(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();

  return useMutation(
    (values) => apiRequest.post(`settings/easysms/disconnect`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([t.SETTING_EASY_SMS]);
        queryClient.invalidateQueries([t.SETTING_SMS_NOTIFICATIONS]);
      },
      ...props,
    },
  );
}

/**
 * Retrieve EasySMS settings.
 */
export function useSettingEasySMS(props) {
  return useRequestQuery(
    [t.SETTING_EASY_SMS],
    { method: 'get', url: `settings/easysms` },
    {
      select: (res) => res.data,
      defaultData: [],
      ...props,
    },
  );
}
