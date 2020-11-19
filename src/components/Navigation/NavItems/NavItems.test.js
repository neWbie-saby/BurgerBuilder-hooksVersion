import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()})

describe('>>NavItems<<', () => {

    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    })

    it('should render 2 NavItems if not logged in', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render 3 NavItems IF logged in', () => {
        //wrapper = shallow(<NavItems isAuthed/>);
        wrapper.setProps({ isAuthed: true });
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should render 1 NavItem IF logged in', () => {
        wrapper.setProps({ isAuthed: true });
        expect(wrapper.contains(<NavItem link='/logout'>Logout</NavItem>)).toEqual(true);
    });
});