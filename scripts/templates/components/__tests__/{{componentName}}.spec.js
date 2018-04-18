/* global describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';
import {{ componentName }} from '../{{componentName}}.jsx';

describe('{{componentName}}', () => {
    it('renders correctly', () => {
        const snapshot = renderer
            .create(<{{ componentName }} />).toJSON();
        expect(snapshot).toMatchSnapshot();
    });
});
