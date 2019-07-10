import React, { PureComponent } from 'react';
import RssParser from 'rss-parser';

import { DataFrame, FieldType } from '@grafana/data';
import { PanelProps } from '@grafana/ui';
import { RssFeedRow } from './RssFeedRow';
import { RssFeed, RssOptions } from '../types';

interface Props extends PanelProps<RssOptions> {}

interface State {
  rssFeed: RssFeed;
  isError: boolean;
}

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export class RssPanel extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rssFeed: {} as RssFeed,
      isError: false,
    };
  }

  componentDidMount(): void {
    this.loadFeed(this.props.options.feedUrl);
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.props.options.feedUrl !== prevProps.options.feedUrl) {
      this.loadFeed(this.props.options.feedUrl);
    }
  }

  async loadFeed(feedUrl: string) {
    const parser = new RssParser();

    try {
      const res = (await parser.parseURL(CORS_PROXY + feedUrl)) as RssFeed;
      console.log( 'FEED', res );
      this.setState({
        rssFeed: res,
        isError: false,
      });
    } catch (err) {
      console.error(err);
      this.setState({ isError: true });
    }
  }

  render() {
    const { isError, rssFeed } = this.state;

    if (rssFeed.items && rssFeed.items.length > 1) {
      return (
        <div
          style={{
            maxHeight: '100%',
            overflow: 'auto',
          }}
        >
          {rssFeed.items.map((item, index) => {
            return <RssFeedRow key={`${item.created}-${index}`} item={item} />;
          })}
        </div>
      );
    }

    if (isError) {
      return <div>Error :(</div>;
    }

    return <div>Loading...</div>;
  }
}

export function feedToDataFrame(feed: RssFeed) {
  const data: DataFrame = {
    fields: [
      {name: 'title', type: FieldType.string},
      // {name: 'content', type: 'string'},
      // {name: 'snippet', type: 'string'},
      // {name: 'creator', type: 'string'},
      {name: 'link', type: FieldType.string},
      // {name: 'guid', type: 'string'},
      // {name: 'isoDate', type: 'time'},
      // {name: 'pubDate', type: 'time'},
    ],
    rows: [],
    meta: {

    }
  };

  for (const item of feed.items) {
    data.rows.push([
      item.title,
      // item.content,
      // item.contentSnippet,
      // item.creator,
      item.link,
      // item.guid,
      // item.isoDate,
      // item.pubDate,
    ]);
  }

  return data;
}

