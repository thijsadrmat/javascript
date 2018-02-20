import Paragraph from './Paragraph';
import React from 'react';
import renderer from 'react-test-renderer';
import site from '../../site';
import waitForHnData from '../../DrupalPage/waitForHnData';
import { mapper, uuid } from '../../utils/tests';

jest.mock('../../site', () => {
  return require('../../utils/tests').mockSite();
});

jest.mock('util-deprecate', () => jest.fn((func) => func));

beforeEach(() => {
  site.getData.mockRestore();
});

describe('Paragraph', async () => {

  test('with required props', async () => {
    const component = await waitForHnData(
      <Paragraph
        mapper={mapper}
        uuid={uuid}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });

  test('with all props', async () => {
    const component = await waitForHnData(
      <Paragraph
        mapper={mapper}
        paragraphProps={{
          testProp: 'testPropValue'
        }}
        uuid={uuid}
        page={{'pageTest': true}}
        index={15}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
});
