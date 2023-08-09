import { Metadata } from 'next'
import Content from './content'


export const metadata: Metadata = {
  title: 'ByFurqon | Dashboard',
  description: 'dashboard page of ByFurqon',
}

export default async function PostPage() {

  return (
    <main className={'container mx-auto flex flex-col gap-10'}>
      <div className={'flex flex-col gap-5'}>
        <h2 className={'text-3xl font-bold'}>New Post</h2>
        <div className={'flex gap-5 overflow-x-auto no-scrollbar'}>
          <Content />
        </div>
      </div>
      <div className={'flex flex-col gap-5'}>
        <h2 className={'text-3xl font-bold'}>Python</h2>
        <div className={'flex gap-5 overflow-x-auto no-scrollbar'}>
          <Content category={'Python'} />
        </div>
      </div>
      <div className={'flex flex-col gap-5'}>
        <h2 className={'text-3xl font-bold'}>Typescript & Javascript</h2>
        <div className={'flex gap-5 overflow-x-auto no-scrollbar'}>
          <Content category={'Typescript'} />
        </div>
      </div>
    </main>
  )
}
