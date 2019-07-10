import React, { PureComponent } from 'react';
import { Gauge, Graph } from '@grafana/ui';
import { ValueMapping } from '@grafana/data';

import { Text } from '../Text/Text';

import { LayoutProps } from '../../types';

interface Props extends LayoutProps {}

export class BigGaugeLayout extends PureComponent<Props> {
  render() {
    const {
      onInterpolate,
      options,
      timeSeries,
      timeRange,
      width,
      height,
      theme,
      thresholds,
      valueMappings,
    } = this.props;

    const gaugeValue = timeSeries[0].stats[options.valueOptions.stat];
    const prefix = onInterpolate(options.valueOptions.prefix);
    const suffix = onInterpolate(options.valueOptions.suffix);

    return (
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        <div style={{ width: '50%' }}>
          <Text
            style={{
              height: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '48px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            theme={theme}
            thresholds={thresholds}
            valueMappings={valueMappings}
            value={gaugeValue}
          >
            Server ok
          </Text>
          <div style={{ height: '70%' }}>
            <Graph
              timeSeries={timeSeries}
              timeRange={timeRange}
              width={width}
              height={height}
              showBars={options.showBars}
              showLines={options.showLines}
              showPoints={options.showPoints}
            />
          </div>
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Gauge
            value={gaugeValue}
            width={width / 2}
            height={height}
            prefix={prefix}
            suffix={suffix}
            unit={options.valueOptions.unit}
            decimals={options.valueOptions.decimals}
            thresholds={options.thresholds}
            valueMappings={[] as ValueMapping[]}
            showThresholdLabels={options.showThresholdLabels}
            showThresholdMarkers={options.showThresholdMarkers}
            minValue={options.minValue}
            maxValue={options.maxValue}
            theme={theme}
          />
        </div>
      </div>
    );
  }
}
