// @ts-nocheck
import React from 'react';
import moment from 'moment';
import intl from 'react-intl-universal';
import { Formik } from 'formik';
import { AppToaster } from 'components';

import ProjectTimeEntryFormContent from './ProjectTimeEntryFormContent';
import { CreateProjectTimeEntryFormSchema } from './ProjectTimeEntryForm.schema';
import { useProjectTimeEntryFormContext } from './ProjectTimeEntryFormProvider';
import withDialogActions from 'containers/Dialog/withDialogActions';

import { compose } from 'utils';

const defaultInitialValues = {
  date: moment(new Date()).format('YYYY-MM-DD'),
  projectId: '',
  taskId: '',
  description: '',
  duration: '',
};

/**
 * Project Time entry form.
 * @returns
 */
function ProjectTimeEntryForm({
  // #withDialogActions
  closeDialog,
}) {
  // time entry form dialog context.
  const { dialogName } = useProjectTimeEntryFormContext();

  // Initial form values
  const initialValues = {
    ...defaultInitialValues,
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const form = {};

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({});
      closeDialog(dialogName);
    };

    // Handle request response errors.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      setSubmitting(false);
    };
  };

  return (
    <Formik
      validationSchema={CreateProjectTimeEntryFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={ProjectTimeEntryFormContent}
    />
  );
}

export default compose(withDialogActions)(ProjectTimeEntryForm);
