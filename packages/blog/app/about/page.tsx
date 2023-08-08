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
            A passionate full-stack developer with a creative mind, turning
            ideas into elegant solutions one line of code at a time
          </p>
        </article>
      </div>
      <section className={'grid grid-cols-2 gap-8 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 '}>
        <div
          className={
            'flex flex-row items-center justify-center max-h-[400px] bg-gray-200'
          }
        >
          <Image
            placeholder={'empty'}
            alt={'about me'}
            src={'/fullstack.jpg'}
            width={400}
            height={400}
          />
        </div>
        <article className={`prose text-justify bg-gray-200 p-8 `}>
          <h2>Furqon ByFurqon</h2>
          <pre>Fullstack Developer</pre>
          <div
            onClick={() => setReadMore(!readMore)}
            className={`${readMore ? 'text-ellipsis line-clamp-6' : ''}`}
          >
            <p>
              Hello there! Welcome to my profile. I&apos;m Furqon ByFurqon, a
              passionate and experienced full-stack developer based in
              Indonesia.
            </p>
            <p>
              With over 3 years of hands-on experience, I have immersed myself
              in the world of software development, specializing in a wide array
              of technologies including Java with Spring Boot, TypeScript with
              Next.js, Python with Flask, Kotlin with Jetpack Compose, and
              NestJS. I also have extensive experience in working with Firebase
              and MySQL, two powerful technologies that have been instrumental
              in building scalable and dynamic applications.
            </p>

            <p>
              As a full-stack developer, I thrive in crafting robust and
              versatile solutions that span across various technologies and
              platforms. I&apos;m proficient in building scalable backend
              systems using Spring Boot and NestJS, while also having a knack
              for creating dynamic and interactive front-end experiences with
              Next.js and Jetpack Compose. Additionally, I&apos;m well-versed in
              developing RESTful APIs and microservices using Flask and Spring
              Boot, often deploying them on AWS Serverless architecture and
              utilizing Docker for containerization. For data storage and
              management, I have utilized the flexibility of Firebase and the
              reliability of MySQL databases.
            </p>

            <p>
              My journey in this field began with a strong foundation in
              education and learning, but it&apos;s the real-world projects and
              experiences that have shaped me into the developer I am today.
              Throughout my career, I&apos;ve had the opportunity to collaborate
              with talented teams, working for a remarkable company where we
              tackle exciting and cutting-edge projects.
            </p>

            <p>
              Beyond my professional pursuits, I&apos;m an avid tech enthusiast,
              always keeping a keen eye on the latest trends and advancements in
              the tech industry. When I&apos;m not coding, you can often find me
              exploring nature, reading tech blogs, or participating in
              hackathons that challenge me to think outside the box.
            </p>

            <p>
              As a developer, I believe in continuous growth and improvement. I
              strive to stay adaptable, embracing new technologies and
              methodologies to deliver the best possible solutions for each
              unique project.
            </p>

            <p>
              I value integrity, open communication, and teamwork, as they are
              essential elements in achieving excellence in any endeavor. By
              combining my technical skills with a creative mindset and a
              commitment to delivering top-notch results, I aspire to make a
              positive impact in the ever-evolving world of technology.
            </p>

            <p>
              I&apos;m thrilled to connect with like-minded individuals, fellow
              developers, and potential collaborators. Feel free to reach out to
              me for exciting discussions, project opportunities, or simply to
              connect over our shared passion for coding and technology.
            </p>

            <p>
              Thank you for visiting my profile, and I&apos;m looking forward to
              engaging with you on this amazing journey of innovation and
              development!
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}
