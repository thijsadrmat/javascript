import React from 'react';
import renderer from 'react-test-renderer';
import site from '../utils/site';
import { asyncMapper, mapper } from '../utils/tests';
import waitForHnData from '../utils/waitForHnData';
import DrupalPage from './DrupalPage';

jest.mock('../utils/site', () => {
  return require('../utils/tests').mockSite();
});

jest.mock('util-deprecate', () => jest.fn(func => func));
console.log = console.warn = console.error = jest.fn(message => {
  throw new Error(message);
});

describe('DrupalPage', async () => {
  test('with required props', async () => {
    const component = <DrupalPage mapper={mapper} url={'/'} />;

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });

  test('with all props', async () => {
    const component = (
      <DrupalPage
        mapper={mapper}
        url={'/'}
        layout={'div'}
        layoutProps={{ testLayoutProp: true }}
        renderWhileLoadingData
        pageProps={{ testPageProp: true }}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });

  test('with asyncMapper', async () => {
    const component = (
      <DrupalPage
        asyncMapper={asyncMapper}
        url={'/'}
        layoutProps={{ testLayoutProp: true }}
        renderWhileLoadingData
        pageProps={{ testPageProp: true }}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });

  test('with asyncMapper as boolean (deprecated)', async () => {
    const component = (
      <DrupalPage
        asyncMapper
        mapper={asyncMapper}
        url={'/'}
        layoutProps={{ testLayoutProp: true }}
        renderWhileLoadingData
        pageProps={{ testPageProp: true }}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });
});
