import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

const navigation = {
  solutions: [
    { name: "For Carriers", href: "#" },
    { name: "For Drivers", href: "#" },
    { name: "For Brokers", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  support: [
    { name: "Demo", href: "#" },
    { name: "Driver Resources", href: "#" },
    { name: "API Status & Automation", href: "#" },
    { name: "Contact Support", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Get Started", href: "#" },
    { name: "Events", href: "#" },
    { name: "Press", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "License", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pt-10 ">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 ">
          <div className="flex flex-col gap-4 items-start justify-center">
            <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold">
              <Image src="/uploads/driveboard_logo.png" alt="logo" width={200} height={100} />
            </Link>
            <p className="text-sm leading-6 text-gray-700">
              A platform connecting drivers with top delivery jobs while helping companies hire reliable,
              vetted professionals easily.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-700 hover:text-gray-400">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-400">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-400">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-700">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-700 hover:text-gray-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-700">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-700 hover:text-gray-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-700">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-700 hover:text-gray-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-700">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-700 hover:text-gray-700">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-t border-white/10 py-4">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} GoDriveBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
