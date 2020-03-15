import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
} from "@blueprintjs/core";
import { useAsync } from 'react-use';
import {optionsMapToArray} from 'utils';
import AppToaster from 'components/AppToaster';
import {
  savePreferences,
  fetchPreferences,
} from 'store/preferences/preferences.actions';

function GeneralPreferences({ savePreferences, fetchPreferences }) {
  const validationSchema = Yup.object().shape({
    organization_name: Yup.string().required(),
    organization_industry: Yup.string().required(),
  });

  const asyncHook = useAsync(async () => {
    await fetchPreferences();
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const options = optionsMapToArray(values).map(option => {
        return {...option, group: 'general'};
      });

      savePreferences(options).then((response) => {
        AppToaster.show({
          message: 'preferences_have_been_updated',
        });
      }).catch(error => {

      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup
        label={'Organization Name'}
        className="{'form-group--organization-name'}"
        inline={true}
        helperText={formik.errors.organization_name && formik.errors.organization_name}
        intent={formik.errors.organization_name && Intent.DANGER}>

        <InputGroup
          medium={true}
          intent={formik.errors.organization_name && Intent.DANGER}
          {...formik.getFieldProps('organization_name')} />
      </FormGroup>

      <FormGroup
        label={'Organization Industry'}
        className="{'form-group--organization-industry'}"
        inline={true}
        helperText={formik.errors.organization_industry && formik.errors.organization_industry}
        intent={formik.errors.organization_industry && Intent.DANGER}>

        <InputGroup
          medium={true}
          intent={formik.errors.organization_industry && Intent.DANGER}
          {...formik.getFieldProps('organization_industry')} />
      </FormGroup>

      <div class="divider mt3 mb2"></div>

      <Button intent={Intent.PRIMARY} type="submit">{ 'Save' }</Button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  savePreferences: (options) => dispatch(savePreferences({ options })),
  fetchPreferences: (keys) => dispatch(fetchPreferences())
});

export default connect(null, mapDispatchToProps)(GeneralPreferences);