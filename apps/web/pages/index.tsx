import Head from 'next/head';
import Image from 'next/image';
import './index.module.scss';
import joey from '../assets/joey.jpg';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

const stats = [
  { label: 'Created', value: '2022' },
  { label: 'Employees', value: '0' },
  { label: 'Beta Users', value: '0' },
  { label: 'Raised', value: '$0' },
];

function getStarted(e: FormEvent, router: NextRouter, email: string) {
  e.preventDefault();
  router.push(`/register?email=${email}`);
}

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <div className="bg-white">
      <Head>
        <title>Another Freaking Notes App</title>
        <meta name="description" content="Another freaking notes app to take notes in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Hero section */}
        <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
            <div>
              <div>
                <img
                  className="h-11 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                  alt="Workflow"
                />
              </div>
              <div className="mt-20">
                <div>
                  <Link href="/blog/whats-new-in-v1">
                    <a className="inline-flex space-x-4">
                      <span className="rounded bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-500 tracking-wide uppercase">
                        What&apos;s new
                      </span>
                      <span className="inline-flex items-center text-sm font-medium text-indigo-500 space-x-1">
                        <span>Just shipped version 1.0.0</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Another Freaking Notes App
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    You didn&apos;t want it, you didn&apos;t need it: it&apos;s Another Freaking Notes App!
                  </p>
                </div>
                <form className="mt-12 sm:max-w-lg sm:w-full sm:flex" onSubmit={e => getStarted(e, router, email)}>
                  <div className="min-w-0 flex-1">
                    <label htmlFor="hero-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <Link href={`/register?email=${email}`}>
                      <a className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10">
                        Get Started
                      </a>
                    </Link>
                  </div>
                </form>
                <div className="mt-6">
                  <div className="inline-flex items-center divide-x divide-gray-300">
                    <div className="flex-shrink-0 flex pr-5">
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3">
                      <span className="font-medium text-gray-900">Rated 5 stars</span> by{' '}
                      <span className="font-medium text-indigo-500">literally no one</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                </svg>
              </div>
              <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                <Image
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://tailwindui.com/img/component-images/task-app-rose.jpg"
                  alt=""
                  width={1075}
                  height={783}
                  layout="fixed"
                />
              </div>
            </div>
          </div>
        </div>
        <Testimonial />
        <CTA email={email} onChange={setEmail} router={router} />
      </main>
      <Footer />
    </div>
  );
}

function Testimonial() {
  return (
    <div className="relative mt-20">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div className="relative sm:py-16 lg:py-0">
          <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
            <svg
              className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            {/* Testimonial card*/}
            <div className="relative pb-10 rounded-2xl shadow-xl overflow-hidden pt-80">
              <Image className="absolute inset-0 h-full w-full object-cover" src={joey} alt="" layout="fill" />
              <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-600 opacity-90" />
              <div className="relative px-8">
                <blockquote className="mt-8">
                  <div className="relative text-lg font-medium text-white md:flex-grow">
                    <svg
                      className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative">We really didn&apos;t need another freaking notes app.</p>
                  </div>

                  <footer className="mt-4">
                    <p className="text-base font-semibold text-indigo-200">
                      Joey Eamigh, Creator of Another Freaking Notes App
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
              On a mission to do what everyone else does
            </h2>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                Everyone needs to take notes. In fact, we&apos;re all taking notes. With Another Freaking Notes App, you
                have another place to forget what note you put your password in! (Please don&apos;t put passwords in
                your notes).
              </p>
              <p className="text-base leading-7">
                There is really not much to say about AFNA. You can take notes. They are stored online. You can access
                them anywhere. You can share them with your friends. You can even share them with your family (if you
                are into that).
              </p>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-10">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
              {stats.map(stat => (
                <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                  <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                  <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <a href="#" className="text-base font-medium text-indigo-500">
                Learn more about how we&apos;re not changing anything&nbsp;&rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTA({ email, onChange, router }: { email: string; onChange: (email: string) => void; router: NextRouter }) {
  return (
    <div className="relative mt-24 sm:mt-32 sm:py-16">
      <div aria-hidden="true" className="hidden sm:block">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
        <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
          <defs>
            <pattern
              id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
        </svg>
      </div>
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative rounded-2xl px-6 py-10 bg-indigo-500 overflow-hidden shadow-xl sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                className="text-indigo-400 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                className="text-indigo-600 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div className="relative">
            <div className="sm:text-center">
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                What are you waiting for?
              </h2>
              <p className="mt-6 mx-auto max-w-2xl text-lg text-indigo-100">
                Enter your email in the box below to get started! We won&apos;t share your email with anyone or even
                email you frankly because we are cheap and email marketing services cost money. Also we don&apos;t care.
              </p>
            </div>
            <form className="mt-12 sm:mx-auto sm:max-w-lg sm:flex" onSubmit={e => getStarted(e, router, email)}>
              <div className="min-w-0 flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => onChange(e.target.value)}
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <Link href={`/register?email=${email}`}>
                  <a className="block w-full rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500 sm:px-10">
                    Get to it
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-gray-900 sm:mt-12">
      <div className="mx-auto max-w-md py-12 px-4 overflow-hidden sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link href={'/login'}>
              <a className="text-base text-gray-400 hover:text-gray-300">Login</a>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href={'/register'}>
              <a className="text-base text-gray-400 hover:text-gray-300">Register</a>
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://github.com/JoeyEamigh/another-freaking-notes-app"
            className="text-gray-400 hover:text-gray-300"
            target={'_blank'}
            rel="noopener noreferrer"
          >
            <span className="sr-only">Github Link</span>
            <FaGithub aria-hidden="true" className="h-7 w-7" />
          </a>
          <a
            href="https://twitter.com/JoeyEamigh"
            className="text-gray-400 hover:text-gray-300"
            target={'_blank'}
            rel="noopener noreferrer"
          >
            <span className="sr-only">Twitter Link</span>
            <FaTwitter aria-hidden="true" className="h-7 w-7" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} Another Freaking Notes App
        </p>
      </div>
    </footer>
  );
}
