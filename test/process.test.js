const { processSite } = require('../lib/process');

let context = null;
const myLoadingImg = '/image/myloading.gif';
beforeEach(() => {
  context = {
    config: {
      lazyload: {
        loadingImg: myLoadingImg,
      }
    }
  };
});

it('should use default image if no specify custom image', () => {
  context.config.lazyload.loadingImg = null;
  const htmlContent = `<img src="abc.png" />`;
  const actual = processSite.bind(context)(htmlContent);
  expect(actual.indexOf('<img src="data:image/png') > -1).toBe(true);
});

it('should use default image if specify a custom image', () => {
  const htmlContent = `<img src="abc.png" />`;
  const actual = processSite.bind(context)(htmlContent);
  expect(actual).toBe(`<img src="${context.config.lazyload.loadingImg}" data-original="abc.png" />`);
});

it('should handle multi cases for `<img />` tag for replace', () => {
  const testCases = [
    {
      actual: `<img src="abc.png" />`,
      expect: `<img src="${myLoadingImg}" data-original="abc.png" />`
    },
    {
      actual: `<img src="abc.png" /><img src="def.png" />`,
      expect: `<img src="${myLoadingImg}" data-original="abc.png" /><img src="${myLoadingImg}" data-original="def.png" />`
    },
    {
      actual: `<img style="width:100px" src="abc.png"></img>`,
      expect: `<img style="width:100px" src="${myLoadingImg}" data-original="abc.png"></img>`
    },
    {
      actual: `<img class="abc" src="abc.png"></img>`,
      expect: `<img class="abc" src="${myLoadingImg}" data-original="abc.png"></img>`
    },
    {
      actual: `<img class="abc" src="abc.png" data-original="def.png"></img>`,
      expect: `<img class="abc" src="abc.png" data-original="def.png"></img>`
    },
  ];

  testCases.forEach(item => {
    expect(processSite.bind(context)(item.actual)).toBe(item.expect);
  });
});

it('should not replace if img is base64 already', () => {
  const htmlContent = `<img src="data:image/png;base64,....." />`;
  const actual = processSite.bind(context)(htmlContent);
  expect(actual).toBe(htmlContent);
});

it('should not replace if `no-lazy` specified', () => {
  const testCases = [
    `<img src="abc.png" no-lazy/>`,
    `<img no-lazy src="abc.png" />`,
    `<img src="abc.png" no-lazy></img>`,
  ];
  testCases.forEach(item => {
    expect(processSite.bind(context)(item)).toBe(item);
  });
});
