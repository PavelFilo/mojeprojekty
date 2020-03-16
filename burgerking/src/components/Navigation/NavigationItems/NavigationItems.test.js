import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    it('should render 2 navlinks if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find('NavLink')).toHaveLength(2);
    });
    it('should render 2 navlinks if not authenticated', () => {
        const wrapper = shallow(<NavigationItems isLogged />);
        expect(wrapper.find('NavLink')).toHaveLength(3);
    });
});