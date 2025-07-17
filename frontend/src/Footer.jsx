export default function Footer() {
  const footerNavs = [
    // {
    //   label: "Resources",
    //   items: [
    //     {
    //       href: "javascript:void()",
    //       name: "contact",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "Support",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "Documentation",
    //     },
    //     {
    //       href: "javascript:void()",
    //       name: "Pricing",
    //     },
    //   ],
    // },
    {
      label: "About",
      items: [
        {
          href: "javascript:void()",
          name: "Terms",
        },
        {
          href: "javascript:void()",
          name: "License",
        },
        {
          href: "javascript:void()",
          name: "Privacy",
        },
        {
          href: "javascript:void()",
          name: "About US",
        },
      ],
    },
    {
      label: "Explore",
      items: [
        {
          href: "javascript:void()",
          name: "Showcase",
        },
        {
          href: "javascript:void()",
          name: "Roadmap",
        },
        {
          href: "javascript:void()",
          name: "Languages",
        },
        {
          href: "javascript:void()",
          name: "Blog",
        },
      ],
    },
    {
      label: "Company",
      items: [
        {
          href: "javascript:void()",
          name: "Partners",
        },
        {
          href: "javascript:void()",
          name: "Team",
        },
        {
          href: "javascript:void()",
          name: "Careers",
        },
      ],
    },
  ];

return (
    <footer className="pt-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="justify-between items-center gap-12 md:flex">
                <div className="flex-1 max-w-lg">
                    <h3 className="text-white text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                        Get our beautiful newsletter straight to your inbox.
                    </h3>
                </div>
                <div className="flex-1 mt-6 md:mt-0">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex items-center gap-x-3 md:justify-end"
                    >
                        <div className="relative flex-1 md:max-w-md">
                            <svg
                                className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                />
                            </svg>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full pl-12 pr-3 py-2 text-gray-300 bg-gray-700 outline-none border border-gray-600 focus:border-violet-500 shadow-sm rounded-lg transition-colors"
                            />
                        </div>
                        <button className="block w-auto py-3 px-4 font-medium text-sm text-center text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition-colors rounded-lg shadow">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
                <img
                    className="w-40 h-25 md:w-80 md:h-60 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    src="./Location_Pic.jpg"
                    alt="SELVA GANAPATHY TRADERS"
                />
                <div>
                    <h1 className="text-white text-lg md:text-xl font-medium">
                        SELVAGANAPATHY TRADERS Main Road, Kananjampatti,
                        Sivakasi-Vembakkottai Road
                    </h1>
                </div>
                <div className="w-full md:w-80 h-48 md:h-60 mt-4 md:mt-0 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        title="Selvaganapathy Traders Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.066181047013!2d77.7979787!3d9.4979634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06c6c6e5e0e7b7%3A0x2e2c0e3e4e7e7e7e!2sSelvaganapathy%20Traders!5e0!3m2!1sen!2sin!4v1717171717171!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <div className="mt-10 py-10 border-t border-gray-700 items-center justify-between sm:flex">
                <p className="text-gray-300">
                    © 2022 Float UI Inc. All rights reserved.
                </p>
                <div className="flex items-center gap-x-6 text-gray-400 mt-6 sm:mt-0">
                    <a href="javascript:void()" className="transition-transform hover:scale-110">
                        {/* Social Icons remain the same */}
                    </a>
                    {/* Other social icons with same hover effect */}
                </div>
            </div>
        </div>
    </footer>
);
}
