import * as React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

import { MonoText } from '../StyledText';
import TabBarIcon from '../TabBarIcon';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it(`MonoText renders correctly`, () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

    expect(tree).toMatchSnapshot();
});

it.only(`TabBarIcon renders correctly`, () => {
    const icon = mount(<TabBarIcon name="heart" focused={false} />);
    console.log(icon.html())
});

