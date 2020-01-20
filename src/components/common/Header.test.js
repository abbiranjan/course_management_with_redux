import React from 'react';
import Header from './Header';
import {shallow, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';

it('Contains 3 NavLink from via shallow', () =>{
    const numLinks = shallow(<Header/>).find("NavLink").length;
    expect(numLinks).toEqual(3);
})

it('Contains 3 NavLink via mount', () => {
    const numAnchors = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    ).find("a").length;
    expect(numAnchors).toEqual(3);
})