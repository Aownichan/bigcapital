import { Inject, Service } from 'typedi';
import { keyBy, sumBy } from 'lodash';
import * as R from 'ramda';
import { ItemEntry } from '@/models';
import HasTenancyService from '../Tenancy/TenancyService';

@Service()
export class ItemEntriesTaxTransactions {
  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Associates tax amount withheld to the model.
   * @param model
   * @returns
   */
  public assocTaxAmountWithheldFromEntries(model: any) {
    const entries = model.entries.map((entry) => ItemEntry.fromJson(entry));
    const taxAmountWithheld = sumBy(entries, 'taxAmount');

    if (taxAmountWithheld) {
      model.taxAmountWithheld = taxAmountWithheld;
    }
    return model;
  }

  /**
   * Associates tax rate id from tax code to entries.
   * @param {number} tenantId
   * @param {} model
   */
  public assocTaxRateIdFromCodeToEntries =
    (tenantId: number) => async (entries: any) => {
      const entriesWithCode = entries.filter((entry) => entry.taxCode);
      const taxCodes = entriesWithCode.map((entry) => entry.taxCode);

      const { TaxRate } = this.tenancy.models(tenantId);
      const foundTaxCodes = await TaxRate.query().whereIn('code', taxCodes);

      const taxCodesMap = keyBy(foundTaxCodes, 'code');

      return entries.map((entry) => {
        if (entry.taxCode) {
          entry.taxRateId = taxCodesMap[entry.taxCode]?.id;
        }
        return entry;
      });
    };
}
