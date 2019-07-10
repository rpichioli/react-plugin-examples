import React, { PureComponent } from 'react';
import {
  PanelEditorProps,
  PanelOptionsGrid,
  ValueMappingsEditor,
  ThresholdsEditor,
} from '@grafana/ui';

import {
  Threshold,
  ValueMapping,
} from '@grafana/data';

import { LayoutOptions } from './LayoutOptions';
import { ValueOptions } from './Gauge/ValueOptions';
import { GaugeOptionsEditor } from './Gauge/GaugeOptionsEditor';
import { GraphOptions } from './Graph/GraphOptions';

import { ComboOptions, SingleStatValueOptions } from '../types';

export class ComboPanelEditor extends PureComponent<
  PanelEditorProps<ComboOptions>
> {
  onLayoutChange = layout =>
    this.props.onChange({ ...this.props.options, layout: layout });

  onValueOptionsChanged = (valueOptions: SingleStatValueOptions) =>
    this.props.onChange({
      ...this.props.options,
      valueOptions,
    });

  onThresholdsChanged = (thresholds: Threshold[]) => {
    this.props.onChange({
      ...this.props.options,
      thresholds,
    });
  };

  onValueMappingsChanged = (valueMappings: ValueMapping[]) =>
    this.props.onChange({
      ...this.props.options,
      valueMappings,
    });

  render() {
    const { options, onChange } = this.props;
    const { layout, valueOptions } = options;

    return (
      <>
        <PanelOptionsGrid>
          <LayoutOptions
            onChange={layout => this.onLayoutChange(layout)}
            selectedLayout={layout}
          />
          <GraphOptions options={options} onChange={onChange} />
        </PanelOptionsGrid>
        <PanelOptionsGrid>
          <ValueOptions
            options={valueOptions}
            onChange={valueOptions => this.onValueOptionsChanged(valueOptions)}
          />
          <GaugeOptionsEditor options={options} onChange={onChange} />
          <ThresholdsEditor
            thresholds={this.props.options.thresholds}
            onChange={thresholds => this.onThresholdsChanged(thresholds)}
          />
        </PanelOptionsGrid>
        <ValueMappingsEditor
          valueMappings={options.valueMappings}
          onChange={this.onValueMappingsChanged}
        />
      </>
    );
  }
}
