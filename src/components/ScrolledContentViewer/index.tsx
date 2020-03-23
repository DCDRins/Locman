import React from 'react'
import GroundImage1 from '../../assets/fake_content/ground_images/hermitage.jpg'
import GroundImage2 from '../../assets/fake_content/ground_images/hermitage-2.jpg'
import GroundImage3 from '../../assets/fake_content/ground_images/hermitage-3.jpg'
import GroundImage4 from '../../assets/fake_content/ground_images/hermitage-4.jpg'
import ScrolledContent from '../.ui/ScrolledContent'
import Group from '../.ui/Group'
import { HasChildren, HasClassName } from '../../.types/props'
import { withLanguage } from '../../common/dictionaries/lang'
import classNames from '../../lib/classNames'
import Event from '../.ui/Event'

type Props = HasChildren & HasClassName & {
  header: withLanguage | string;
}

const ScrolledContentViewer = ({ header, className = '', children }: Props) => {
  const base = "Scrolled-Content-Viewer"

  return (
    <ScrolledContent className={classNames(base, className)} orientation="horizontal">
      {children ? children : (
        <Group>
           <Event name="Эрмитаж" image={GroundImage1} title="Test" description="test" />
           <Event name="Эрмитаж" image={GroundImage2} title="Test" description="test" />
           <Event name="Эрмитаж" image={GroundImage3} title="Test" description="test" />
           <Event name="Эрмитаж" image={GroundImage4} title="Test" description="test" />
           <Event name="Эрмитаж" image={GroundImage1} title="Test" description="test" />
           <Event name="Эрмитаж" image={GroundImage2} title="Test" description="test" />
           <Event name="Эрмитаж" image={GroundImage3} title="Test" description="test" />
           <Event name="Эрмитаж" image={GroundImage4} title="Test" description="test" />
        </Group>
      )}
    </ScrolledContent>
  )
}

export default ScrolledContentViewer
