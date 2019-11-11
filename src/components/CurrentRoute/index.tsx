import React, { FunctionComponent } from 'react';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import Event from '../.ui/Event';
import ScrolledContent from '../.ui/ScrolledContent';
import terms from '../../common/terms';

const CurrentRoute: FunctionComponent = () => {
  const base = 'Current-Route';
  return (
    <Section header={terms.CURRENT_ROUTE} className={base}>
      <Group content="start" className={`${base}__content`}>
        <Group orientation="vertical" className={`${base}__wrapper`}>
          <ScrolledContent>
            <Event size="s" title="Эрмитаж" visitDate={"27.10.2019"} />
            <Event size="s" title="Эрмитаж" visitDate={"27.10.2019"} />
            <Event size="s" title="Эрмитаж" visitDate={"27.10.2019"} />
          </ScrolledContent>
        </Group>
        <Event title="Эрмитаж" size="l" visitDate={"27.10.2019"} className={`${base}__closest`} />
      </Group>
    </Section>
  )
}

export default CurrentRoute
