import React, { FunctionComponent } from 'react';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import Event from '../.ui/Event';
import ScrolledContent from '../.ui/ScrolledContent';
import GroundImage from '../../assets/fake_content/ground_images/hermitage-3.jpg'
import GroundImage1 from '../../assets/fake_content/ground_images/hermitage-4.jpg'
import GroundImage2 from '../../assets/fake_content/ground_images/hermitage-2.jpg'
import terms from '../../common/dictionaries/terms';

const CurrentRoute: FunctionComponent = () => {
  const base = 'Current-Route';
  return (
    <Section
      header={terms.CURRENT_ROUTE}
      className={`${base}`}
      side={
        // <Side title="27.10.2019" denyMedia />
        <Group content="start" className={`${base}__content`} stretched orientation="vertical">
          <ScrolledContent orientation="horizontal" fit className={`${base}__wrapper`}>
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage2} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage1} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage2} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage1} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage2} /> 
            <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage1} /> 
          </ScrolledContent>
          {/* <Event size="m" name="Эрмитаж" image={GroundImage2} allowMedia /> */}
        </Group>
      }
    >
      <Event size="l" name="name" title="Эрмитаж" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage2} /> 
    </Section>
  )
}

export default CurrentRoute
