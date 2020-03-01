import * as React from 'react';

export interface GenericListProps<T> {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
}

export default class GenericList<T> extends React.Component<GenericListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;
    return items.map(itemRenderer);
  }
}
