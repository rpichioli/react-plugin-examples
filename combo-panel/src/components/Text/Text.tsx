import React, { PureComponent } from 'react';
import {
  BasicGaugeColor,
  getColorFromHexRgbOrName,
  GrafanaTheme
} from '@grafana/ui';

import {
  getMappedValue,
  Threshold,
  TimeSeriesValue,
  ValueMapping,
} from '@grafana/data';

interface Props {
  style: React.CSSProperties;
  valueMappings: ValueMapping[];
  thresholds: Threshold[];
  theme: GrafanaTheme;
  value: number;
}

export class Text extends PureComponent<Props> {
  getFontColor(value: TimeSeriesValue) {
    const { thresholds, theme } = this.props;

    if (thresholds.length === 1) {
      return getColorFromHexRgbOrName(thresholds[0].color, theme.type);
    }

    const atThreshold = thresholds.filter(
      threshold => (value as number) === threshold.value
    )[0];
    if (atThreshold) {
      return getColorFromHexRgbOrName(atThreshold.color, theme.type);
    }

    const belowThreshold = thresholds.filter(
      threshold => (value as number) > threshold.value
    );

    if (belowThreshold.length > 0) {
      const nearestThreshold = belowThreshold.sort(
        (t1, t2) => t2.value - t1.value
      )[0];
      return getColorFromHexRgbOrName(nearestThreshold.color, theme.type);
    }

    return BasicGaugeColor.Red;
  }

  render() {
    const { valueMappings, value, style } = this.props;
    let text = '';
    if (valueMappings.length > 0) {
      const valueMappedValue = getMappedValue(valueMappings, value);
      if (valueMappedValue) {
        text = valueMappedValue.text;
      }
    }

    return (
      <div style={Object.assign(style, { color: this.getFontColor(value) })}>
        {text}
      </div>
    );
  }
}
