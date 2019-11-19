import React, { FunctionComponent } from 'react';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import Event from '../.ui/Event';
import ScrolledContent from '../.ui/ScrolledContent';
import terms from '../../common/terms';
import Side from '../.ui/Event/Side';

const CurrentRoute: FunctionComponent = () => {
  const base = 'Current-Route';
  return (
    <Section
      header={terms.CURRENT_ROUTE}
      className={`${base} Event`}
      side={
        <Side visitDate="27.10.2019" />
      }
    >
      <Group content="start" className={`${base}__content`}>
        <ScrolledContent className={`${base}__wrapper`}>
          <Event size="s" title="Эрмитаж" visitDate="27.10.2019" image="https://cdn23.img.ria.ru/images/103609/79/1036097900_0:158:3083:1892_600x0_80_0_0_30365e257ed6613f1974834fab5badfe.jpg" />
          <Event size="s" title="Эрмитаж" visitDate="27.10.2019" image="https://cdn23.img.ria.ru/images/103609/79/1036097900_0:158:3083:1892_600x0_80_0_0_30365e257ed6613f1974834fab5badfe.jpg" />
          <Event size="s" title="Эрмитаж" visitDate="27.10.2019" image="https://cdn23.img.ria.ru/images/103609/79/1036097900_0:158:3083:1892_600x0_80_0_0_30365e257ed6613f1974834fab5badfe.jpg" />
        </ScrolledContent>
        <Event title="Эрмитаж" size="m" image="https://cdn23.img.ria.ru/images/103609/79/1036097900_0:158:3083:1892_600x0_80_0_0_30365e257ed6613f1974834fab5badfe.jpg" />
      </Group>
    </Section>
  )
}

export default CurrentRoute
