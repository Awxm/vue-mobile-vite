import Mock from 'mockjs';

export default [
  {
    url: '/api/post',
    method: 'post',
    timeout: 100,
    response: {
      code: '10000',
      data: {
        ...Mock.mock({
          'list|11': [
            {
              index: /S20201228115950[0-9][0-9][0-9]/,
              pdName: '@first',
              pdNum: 'p_tmp_60a637cd0d',
              'purchaseNum|1-100': 100,
              adminName: '@cname',
              updateTime: '@date("yyyy-MM-dd HH:mm:ss")',
              pdType: '@string',
            },
          ],
        }),
      },
    },
  },
];
