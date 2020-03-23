import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import { appRoutes } from '../../common/dictionaries/routes';
import Side from '../.ui/Side';
import Div from '../.ui/Div';

const CurrentEvent: FunctionComponent = () => {
  const base = 'Current-Event';
  return (
    <Section
      className={base}
      side={
        <Side
          // reversed
          justify="center"
          title="Lorem Ipsum"
        />
      }
    >
      <Group
        // justify="center"
        content="center"
        orientation="vertical"
        className={`${base}__content`}
      >
        {/* <Button stretched level="tag" angular>Эрмитаж</Button> */}
        <Div className={`${base}__title`}>
          <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/any`}>Музей им. Ленина</Link>
        </Div>
        <div className={`${base}__date`}>27.10.2020</div>
        <div className={`${base}__address`}>Дворцовая пл., 2, Санкт-Петербург, 190000</div>
      </Group>
    </Section>
  )
}

export default CurrentEvent
