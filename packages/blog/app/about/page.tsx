'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function AboutPage() {
  const [readMore, setReadMore] = useState(true)

  return (
    <main className={'container mx-auto flex-col flex gap-8'}>
      <div>
        <article className={'prose'}>
          <h1>About Me</h1>
          <p>
            A passionate full-stack developer with a creative mind, turning ideas into elegant solutions one line of
            code at a time
          </p>
        </article>
      </div>
      <section className={'grid grid-cols-2 gap-8 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 '}>
        <div className={'flex flex-row items-center justify-center max-h-[400px] bg-gray-200'}>
          <Image placeholder={'empty'} alt={'about me'} src={'/fullstack.jpg'} width={400} height={400} />
        </div>
        <article className={`prose text-justify bg-gray-200 p-8 `}>
          <h2>Furqon Romdhani</h2>
          <pre>Fullstack Developer</pre>
          <div onClick={() => setReadMore(!readMore)} className={`${readMore ? 'text-ellipsis line-clamp-6' : ''}`}>
            <p>
              Hello! I&apos;m Furqon Romdhani, a passionate Fullstack Developer with over 2 years of experience in
              crafting robust and user-centric web applications. I thrive on the challenges and creative opportunities
              that come with building both the frontend and backend components of a project.
            </p>
            <h3>My Journey </h3>
            <p>
              My journey in the world of web development began more than 2 years ago, and I&apos;ve been hooked ever
              since. I started by immersing myself in the fundamentals of programming, gradually expanding my skills to
              encompass a wide range of technologies. This journey has not only refined my technical abilities but also
              instilled in me a deep appreciation for the art of creating seamless online experiences.
            </p>
            <h3>Frontend Expertise</h3>
            <p>
              On the frontend, I excel in translating design concepts into captivating user interfaces. With a keen eye
              for detail and a focus on user experience, I harness the power of HTML, CSS, and JavaScript frameworks
              like React to breathe life into designs. I&apos;m a firm believer in responsive and accessible design,
              ensuring that users across different devices and abilities can engage with the applications I develop.
            </p>
            <h3>Backend Wizardry </h3>
            <p>
              When it comes to the backend, I revel in architecting and implementing efficient server-side solutions. My
              expertise spans various backend technologies, and I&apos;m proficient in setting up databases, designing
              APIs, and handling server logic. Whether it&apos;s building RESTful APIs or diving into the world of
              GraphQL, I take pride in creating the backbone that supports the frontend magic.
            </p>
            <h3>Problem Solver </h3>
            <p>
              Throughout my career, I&apos;ve encountered and overcome numerous technical challenges. Problem-solving is
              at the core of what I do, and I approach each hurdle as an opportunity to learn and innovate. My
              analytical mindset and ability to think outside the box have proven invaluable in troubleshooting and
              finding elegant solutions.
            </p>
            <h3> Continuous Learning </h3>
            <p>
              Technology is constantly evolving, and I&apos;m committed to staying at the forefront of the field.
              I&apos;m an avid learner, always seeking out new tools, libraries, and methodologies that can elevate my
              development process. This drive to evolve ensures that I deliver solutions that are not only current but
              also future-proof.
            </p>
            <h3>Let&apos;s Connect!</h3>
            <p>
              I&apos;m excited about the potential to collaborate on new and exciting projects. Whether it&apos;s
              refining the user experience, optimizing application performance, or architecting complex systems,
              I&apos;m ready to contribute my skills and experience to make a meaningful impact. Feel free to reach out
              to me via{' '}
              <a href="https://www.linkedin.com/in/furqon-romdhani-724a29150/" target={'_blank'}>
                LinkedIn
              </a>{' '}
              or{' '}
              <a href="https://github.com/furqonat" target={'_blank'}>
                GitHub.
              </a>
              Let&apos;s connect and explore the possibilities!
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}
