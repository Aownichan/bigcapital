// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';
import { Classes, Intent, Position } from '@blueprintjs/core';
import { CLASSES } from 'common/classes';
import classNames from 'classnames';
import {
  FFormGroup,
  FInputGroup,
  FDateInput,
  FTextArea,
  FEditableText,
  FieldRequiredHint,
  FormattedMessage as T,
} from 'components';
import { ProjectSelect, TaskSelect } from './components';
import { momentFormatter } from 'utils';

/**
 * Project time entry form fields.
 * @returns
 */
function ProjectTimeEntryFormFields() {
  return (
    <div className={Classes.DIALOG_BODY}>
      {/*------------ Project -----------*/}
      <FFormGroup
        name={'projectId'}
        label={<T id={'project_time_entry.dialog.project'} />}
        labelInfo={<FieldRequiredHint />}
        className={classNames('form-group--select-list', Classes.FILL)}
      >
        <ProjectSelect
          name={'tesc'}
          projects={[]}
          popoverProps={{ minimal: true }}
        />
      </FFormGroup>
      {/*------------ Task -----------*/}
      <FFormGroup
        name={'taskId'}
        label={<T id={'project_time_entry.dialog.task'} />}
        labelInfo={<FieldRequiredHint />}
        className={classNames('form-group--select-list', Classes.FILL)}
      >
        <TaskSelect
          name={'taskId'}
          tasks={[]}
          popoverProps={{ minimal: true }}
        />
      </FFormGroup>

      {/*------------ Duration -----------*/}
      <FFormGroup
        label={intl.get('project_time_entry.dialog.duration')}
        name={'duration'}
        labelInfo={<FieldRequiredHint />}
      >
        <FInputGroup name="duration" inputProps={{}} />
      </FFormGroup>
      {/*------------ Date -----------*/}
      <FFormGroup
        label={intl.get('project_time_entry.dialog.date')}
        name={'date'}
        className={classNames(CLASSES.FILL, 'form-group--date')}
      >
        <FDateInput
          {...momentFormatter('YYYY/MM/DD')}
          name="date"
          formatDate={(date) => date.toLocaleString()}
          popoverProps={{
            position: Position.BOTTOM,
            minimal: true,
          }}
        />
      </FFormGroup>
      {/*------------ Description -----------*/}
      <FFormGroup
        name={'description'}
        label={intl.get('project_time_entry.dialog.description')}
        className={'form-group--description'}
      >
        <FTextArea name={'description'} />
      </FFormGroup>
    </div>
  );
}

export default ProjectTimeEntryFormFields;
