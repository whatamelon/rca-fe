/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useCreateContentMutation } from '@/lib/stores/service/contentSlice'

export default function MigrationBrandList() {
  const [trigger] = useCreateContentMutation()

  const brandList = [
    {
      code: 'GB',
      brandName: '럭키슈에뜨',
      eventId: '838',
      imgLink: 'https://s3.ap-northeast-2.amazonaws.com/img.the-relay/components/234/contents/838_image.png',
      isEdit: false,
      newImagePrev: null,
      newImageValue: null,
      index: 0,
    },
    {
      code: 'GD',
      brandName: '코오롱스포츠',
      eventId: '839',
      imgLink: 'https://s3.ap-northeast-2.amazonaws.com/img.the-relay/components/234/contents/839_image.png',
      isEdit: false,
      newImagePrev: null,
      newImageValue: null,
      index: 1,
    },
    {
      code: 'GC',
      brandName: '시리즈',
      eventId: '840',
      imgLink: 'https://s3.ap-northeast-2.amazonaws.com/img.the-relay/components/234/contents/840_image.png',
      isEdit: false,
      newImagePrev: null,
      newImageValue: null,
      index: 2,
    },
    {
      code: 'GQ',
      brandName: '헨리코튼',
      eventId: '841',
      imgLink: 'https://s3.ap-northeast-2.amazonaws.com/img.the-relay/components/234/contents/841_image.png',
      isEdit: false,
      newImagePrev: null,
      newImageValue: null,
      index: 3,
    },
    {
      code: 'GH',
      brandName: '에피그램',
      eventId: '846',
      imgLink: 'https://s3.ap-northeast-2.amazonaws.com/img.the-relay/components/234/contents/846_image.png',
      isEdit: false,
      newImagePrev: null,
      newImageValue: null,
      index: 4,
    },
  ]

  const updateContent = async (row: any) => {
    const payload = {
      pageCode: 'home',
      typeCode: 'BL',
      title: row.brandName,
      titleColor: row.titleColor,
      bodyColor: row.bodyColor,
      actType: 'evpl',
      actData: row.eventId,
      imgLink: row.imgLink,
    }
    await trigger(payload)
  }

  const go = async () => {
    await Promise.all(brandList.map((row: any) => updateContent(row)))
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="display-1-b text-orange-600">BRAND LIST MIGRATION</h3>
      <button type="button" onClick={go} className="bg-black p-4 text-white">
        브랜드리스트 마이그레이션 가자~
      </button>
    </div>
  )
}
