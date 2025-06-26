import { GlobalCode } from '@/lib/types/global'

export const bankList: GlobalCode[] = [
  {
    name: '기업은행',
    code: '003',
  },
  {
    name: '국민은행',
    code: '004',
  },
  {
    name: '수협은행',
    code: '007',
  },
  {
    name: 'NH농협은행',
    code: '011',
  },
  {
    name: '농축협',
    code: '012',
  },
  {
    name: '우리은행',
    code: '020',
  },
  {
    name: 'SC제일은행',
    code: '023',
  },
  {
    name: '한국씨티은행',
    code: '027',
  },
  {
    name: '아이엠뱅크(구 대구은행)',
    code: '031',
  },
  {
    name: '부산은행',
    code: '032',
  },
  {
    name: '광주은행',
    code: '034',
  },
  {
    name: '제주은행',
    code: '035',
  },
  {
    name: '전북은행',
    code: '037',
  },
  {
    name: '경남은행',
    code: '039',
  },
  {
    name: '새마을금고',
    code: '045',
  },
  {
    name: '신협',
    code: '048',
  },
  {
    name: '저축은행',
    code: '050',
  },
  {
    name: 'HSBC은행',
    code: '054',
  },
  {
    name: '산림조합중앙회',
    code: '064',
  },
  {
    name: '우체국',
    code: '071',
  },
  {
    name: '하나은행',
    code: '081',
  },
  {
    name: '신한은행',
    code: '088',
  },
  {
    name: '케이뱅크',
    code: '089',
  },
  {
    name: '카카오뱅크',
    code: '090',
  },
  {
    name: '토스뱅크',
    code: '092',
  },
  {
    name: '산업은행',
    code: '002',
  },
]

export const bankMap = new Map(bankList.map((item) => [item.code, item.name]))
