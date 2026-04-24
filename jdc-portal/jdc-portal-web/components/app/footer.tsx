'use client'

import { getLoginSite, logoutAction } from "@/lib/service/action/security-action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {

    const [site, setSite] = useState<string>()

    useEffect(() => {
        async function load() {
            const site = await getLoginSite()
            setSite(site)
        }
        load()
    }, [])

    return (
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Java Developer Class</h3>
            <p className="text-sm text-gray-400">
              Empowering students with modern technology skills.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            {site ? <MemberLinks site={site} /> : <AnonymousLinks />}
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm text-gray-400">Email: info@school.com</p>
            <p className="text-sm text-gray-400">Phone: +959123456789</p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Java Developer Class
        </div>
      </footer>
    )
}

function AnonymousLinks() {
  return (
    <ul className="text-sm text-gray-400 space-y-1">
      <li>
        <Link href="/confirm">Confirm Registration</Link>
      </li>
      <li>
        <Link href="/signin">Sign In</Link>
      </li>
    </ul>
  )
}

function MemberLinks({ site }: { site: string }) {

  const router = useRouter()

  const signOut = async () => {
    await logoutAction()
    if(site === '/student') {
        router.replace('/signin')
    } else if (site === '/office') {
        router.replace('/signin/employee')
    }
  }

  const siteName = site === '/student' ? 'Student Home' : 'Office Home'
  return (
    <ul className="text-sm text-gray-400 space-y-1">
      <li>
        <Link href={site}>{ siteName }</Link>
      </li>
      <li>
        <a href="#" onClick={signOut}>Sign Out</a>
      </li>
    </ul>
  )
}