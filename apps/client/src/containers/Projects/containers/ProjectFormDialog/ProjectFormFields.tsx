// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { useFormikContext } from 'formik';

import { Classes, Position, FormGroup, ControlGroup } from '@blueprintjs/core';
import { FastField } from 'formik';
import { CLASSES } from '@/constants/classes';
import classNames from 'classnames';
import {
  FFormGroup,
  FInputGroup,
  FCheckbox,
  FDateInput,
  FMoneyInputGroup,
  InputPrependText,
  FormattedMessage as T,
  FieldRequiredHint,
  CustomerSelectField,
  Stack,
} from '@/components';
import { inputIntent, momentFormatter } from '@/utils';
import { useProjectFormContext } from './ProjectFormProvider';

/**
 * Project form fields.
 * @returns
 */
function ProjectFormFields() {
  // project form dialog context.
  const { customers } = useProjectFormContext();

  // Formik context.
  const { values } = useFormikContext();

  return (
    <div className={Classes.DIALOG_BODY}>
      <Stack spacing={25}>
        {/*------------ Contact -----------*/}
        <FastField name={'contact_id'}>
          {({ form, field: { value }, meta: { error, touched } }) => (
            <FormGroup
              label={intl.get('projects.dialog.contact')}
              className={classNames('form-group--select-list', Classes.FILL)}
              intent={inputIntent({ error, touched })}
            >
              <CustomerSelectField
                contacts={customers}
                selectedContactId={value}
                defaultSelectText={'Find or create a customer'}
                onContactSelected={(customer) => {
                  form.setFieldValue('contact_id', customer.id);
                }}
                allowCreate={true}
                popoverFill={true}
              />
            </FormGroup>
          )}
        </FastField>

        {/*------------ Project Name -----------*/}
        <FFormGroup
          label={intl.get('projects.dialog.project_name')}
          name={'name'}
        >
          <FInputGroup name="name" />
        </FFormGroup>

        <Stack spacing={15}>
          {/*------------ DeadLine -----------*/}
          <FFormGroup
            label={intl.get('projects.dialog.deadline')}
            name={'deadline'}
            className={classNames(CLASSES.FILL, 'form-group--date')}
          >
            <FDateInput
              {...momentFormatter('YYYY/MM/DD')}
              name="deadline"
              formatDate={(date) => date.toLocaleString()}
              popoverProps={{
                position: Position.BOTTOM,
                minimal: true,
              }}
            />
          </FFormGroup>

          {/*------------ CheckBox -----------*/}
          <FFormGroup name={'published'}>
            <FCheckbox
              name="published"
              label={intl.get('projects.dialog.calculator_expenses')}
            />
          </FFormGroup>
        </Stack>

        {/*------------ Cost Estimate -----------*/}
        <FFormGroup
          name={'cost_estimate'}
          label={intl.get('projects.dialog.cost_estimate')}
        >
          <ControlGroup>
            <FMoneyInputGroup
              disabled={values.published}
              name={'cost_estimate'}
              allowDecimals={true}
              allowNegativeValue={true}
            />
            <InputPrependText text={'USD'} />
          </ControlGroup>
        </FFormGroup>
      </Stack>
    </div>
  );
}

export default ProjectFormFields;
