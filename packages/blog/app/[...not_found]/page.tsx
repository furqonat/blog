export default function NotFoundPage() {
  return (
    <main className={'container mx-auto flex flex-col items-center'}>
      <object data={'/not-found.svg'} width={320} height={400} />
      <h1 className={'text-2xl font-semibold'}>Sorry you in wrong direction</h1>
    </main>
  )
}
