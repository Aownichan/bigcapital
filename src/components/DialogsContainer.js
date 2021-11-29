import React from 'react';

import AccountDialog from 'containers/Dialogs/AccountDialog';
import InviteUserDialog from 'containers/Dialogs/InviteUserDialog';
import UserFormDialog from 'containers/Dialogs/UserFormDialog';
import ItemCategoryDialog from 'containers/Dialogs/ItemCategoryDialog';
import CurrencyFormDialog from 'containers/Dialogs/CurrencyFormDialog';
import ExchangeRateFormDialog from 'containers/Dialogs/ExchangeRateFormDialog';

import InventoryAdjustmentDialog from 'containers/Dialogs/InventoryAdjustmentFormDialog';
import PaymentViaVoucherDialog from 'containers/Dialogs/PaymentViaVoucherDialog';
import KeyboardShortcutsDialog from 'containers/Dialogs/keyboardShortcutsDialog';
import ContactDuplicateDialog from 'containers/Dialogs/ContactDuplicateDialog';
import QuickPaymentReceiveFormDialog from 'containers/Dialogs/QuickPaymentReceiveFormDialog';
import QuickPaymentMadeFormDialog from 'containers/Dialogs/QuickPaymentMadeFormDialog';
import AllocateLandedCostDialog from 'containers/Dialogs/AllocateLandedCostDialog';
import InvoicePdfPreviewDialog from 'containers/Dialogs/InvoicePdfPreviewDialog';
import EstimatePdfPreviewDialog from 'containers/Dialogs/EstimatePdfPreviewDialog';
import ReceiptPdfPreviewDialog from '../containers/Dialogs/ReceiptPdfPreviewDialog';
import MoneyInDialog from '../containers/Dialogs/MoneyInDialog';
import MoneyOutDialog from '../containers/Dialogs/MoneyOutDialog';
import BadDebtDialog from '../containers/Dialogs/BadDebtDialog';
import NotifyInvoiceViaSMSDialog from '../containers/Dialogs/NotifyInvoiceViaSMSDialog';
import NotifyReceiptViaSMSDialog from '../containers/Dialogs/NotifyReceiptViaSMSDialog';
import NotifyEstimateViaSMSDialog from '../containers/Dialogs/NotifyEstimateViaSMSDialog';
import NotifyPaymentReceiveViaSMSDialog from '../containers/Dialogs/NotifyPaymentReceiveViaSMSDialog';
import SMSMessageDialog from '../containers/Dialogs/SMSMessageDialog';
import TransactionsLockingDialog from '../containers/Dialogs/TransactionsLockingDialog';
import EasySMSIntegrationDialog from '../containers/Dialogs/EasySMSIntegrationDialog';

/**
 * Dialogs container.
 */
export default function DialogsContainer() {
  return (
    <div>
      <AccountDialog dialogName={'account-form'} />
      <CurrencyFormDialog dialogName={'currency-form'} />
      <InviteUserDialog dialogName={'invite-user'} />
      <UserFormDialog dialogName={'user-form'} />
      <ExchangeRateFormDialog dialogName={'exchangeRate-form'} />
      <ItemCategoryDialog dialogName={'item-category-form'} />
      <InventoryAdjustmentDialog dialogName={'inventory-adjustment'} />
      <PaymentViaVoucherDialog dialogName={'payment-via-voucher'} />
      <KeyboardShortcutsDialog dialogName={'keyboard-shortcuts'} />
      <ContactDuplicateDialog dialogName={'contact-duplicate'} />
      <QuickPaymentReceiveFormDialog dialogName={'quick-payment-receive'} />
      <QuickPaymentMadeFormDialog dialogName={'quick-payment-made'} />
      <AllocateLandedCostDialog dialogName={'allocate-landed-cost'} />
      <InvoicePdfPreviewDialog dialogName={'invoice-pdf-preview'} />
      <EstimatePdfPreviewDialog dialogName={'estimate-pdf-preview'} />
      <ReceiptPdfPreviewDialog dialogName={'receipt-pdf-preview'} />
      <MoneyInDialog dialogName={'money-in'} />
      <MoneyOutDialog dialogName={'money-out'} />

      <NotifyInvoiceViaSMSDialog dialogName={'notify-invoice-via-sms'} />
      <NotifyReceiptViaSMSDialog dialogName={'notify-receipt-via-sms'} />
      <NotifyEstimateViaSMSDialog dialogName={'notify-estimate-via-sms'} />
      <NotifyPaymentReceiveViaSMSDialog dialogName={'notify-payment-via-sms'} />

      <BadDebtDialog dialogName={'write-off-bad-debt'} />
      <SMSMessageDialog dialogName={'sms-message-form'} />
      <TransactionsLockingDialog dialogName={'transactions-locking'} />
      <EasySMSIntegrationDialog dialogName={'easysms-integrate'} />
    </div>
  );
}
