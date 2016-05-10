// Copyright 2004-present Facebook. All Rights Reserved.

/* eslint-disable no-unused-vars */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from './SampleComponent.jsx';
import expect from 'expect';

describe('CheckboxWithLabel', () => {

    it('changes the text after click', () => {
        // Render a checkbox with label in the document
        const checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel labelOn="On" labelOff="Off" />
        );

        const checkboxNode = ReactDOM.findDOMNode(checkbox);

        // Verify that it's Off by default
        expect(checkboxNode.textContent).toBe('Off');

        // Simulate a click and verify that it is now On
        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );
        expect(checkboxNode.textContent).toBe('On');
    });

});
