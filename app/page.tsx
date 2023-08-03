import Image from 'next/image'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from '@iofel/types';


export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

    const { data: posts } = await supabase.from("post").select();

  return (
    <main className={'container mx-auto'}>
       <ul className="my-auto">
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}
