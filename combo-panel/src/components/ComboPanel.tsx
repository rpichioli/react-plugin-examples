import React, { PureComponent } from 'react';
import {
  PanelProps,
  ThemeContext,
} from '@grafana/ui';

import {
  NullValueMode,
  processTimeSeries
} from '@grafana/data';

import { ComboOptions } from '../types';
import { BigTextLayout } from './Text/BigTextLayout';
import { BigGaugeLayout } from './Gauge/BigGaugeLayout';
import { BigGraphLayout } from './Graph/BigGraphLayout';

interface Props extends PanelProps<ComboOptions> {}

export class ComboPanel extends PureComponent<Props> {
  // Gauge does not get proper width

  render() {
    const {
      onInterpolate,
      options,
      panelData,
      timeRange,
      width,
      height,
    } = this.props;

    const { layout, valueMappings, thresholds } = options;

    if (panelData.timeSeries) {
      const timeSeries = processTimeSeries({
        timeSeries: panelData.timeSeries,
        nullValueMode: NullValueMode.Null,
      });

      switch (layout) {
        case 'bigtext':
          return (
            <ThemeContext.Consumer>
              {theme => {
                return (
                  <BigTextLayout
                    timeSeries={timeSeries}
                    timeRange={timeRange}
                    width={width}
                    height={height}
                    options={options}
                    onInterpolate={onInterpolate}
                    valueMappings={valueMappings}
                    thresholds={thresholds}
                    theme={theme}
                  />
                );
              }}
            </ThemeContext.Consumer>
          );

        case 'biggraph':
          return (
            <ThemeContext.Consumer>
              {theme => {
                return (
                  <BigGraphLayout
                    timeSeries={timeSeries}
                    timeRange={timeRange}
                    width={width}
                    height={height}
                    options={options}
                    onInterpolate={onInterpolate}
                    theme={theme}
                    valueMappings={valueMappings}
                    thresholds={thresholds}
                  />
                );
              }}
            </ThemeContext.Consumer>
          );

        default:
        case 'biggauge':
          return (
            <ThemeContext.Consumer>
              {theme => {
                return (
                  <BigGaugeLayout
                    timeSeries={timeSeries}
                    timeRange={timeRange}
                    width={width}
                    height={height}
                    options={options}
                    onInterpolate={onInterpolate}
                    theme={theme}
                    thresholds={thresholds}
                    valueMappings={valueMappings}
                  />
                );
              }}
            </ThemeContext.Consumer>
          );
      }
    } else {
      return <div>Panel needs time series data</div>;
    }
  }
}
