import React, { PureComponent } from 'react';
import { FormField, PanelOptionsGroup, PanelEditorProps } from '@grafana/ui';
import { RssOptions } from '../types';

interface State {
  feedUrl: string;
}

export class RssPanelEditor extends PureComponent<
  PanelEditorProps<RssOptions>,
  State
> {
  constructor(props: PanelEditorProps<RssOptions>) {
    super(props);

    this.state = {
      feedUrl: props.options.feedUrl,
    };
  }

  onUpdatePanel = () =>
    this.props.onOptionsChange({ ...this.props.options, feedUrl: this.state.feedUrl });

  onFeedUrlChange = ({ target }: any) =>
    this.setState({ feedUrl: target.value });

  render() {
    const { feedUrl } = this.state;

    return (
      <>
        <PanelOptionsGroup title="Feed">
          <div className="gf-form">
            <FormField
              label="Feed url"
              labelWidth={6}
              inputWidth={25}
              value={feedUrl}
              onChange={this.onFeedUrlChange}
              onBlur={this.onUpdatePanel}
            />
          </div>
        </PanelOptionsGroup>
      </>
    );
  }
}
