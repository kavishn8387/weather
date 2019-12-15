import React from 'react';
import Enzyme, { shallow, enzyme, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withRouter } from 'react-router';
import { IconButton } from '@material-ui/core/IconButton';

import PasswordInput from './PasswordInput';

Enzyme.configure({ adapter: new Adapter() });

describe('<PasswordInput />', () => {
    it('renders', () => {
        const wrapper = shallow(<PasswordInput />);
        expect(wrapper).toMatchSnapshot();
    });


    it('Test click event on IconButton', () => {
        const component = mount(<PasswordInput />);
        component.find('IconButton').simulate('click');
        expect(component.state().showPassword).toBe(true);
    });
});
