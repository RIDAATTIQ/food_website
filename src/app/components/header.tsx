import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-gray-900 p-6 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Company Name */}
        <div className="text-white text-3xl font-bold tracking-wide">
          <Link href="/" passHref>
            <span className="cursor-pointer hover:text-emerald-400 transition-all duration-300">Zaiqa Express</span>
          </Link>
        </div>

        {/* Navbar links */}
        <div className="space-x-8 hidden md:flex"> {/* Hide links on small screens */}
          <Link href="/" passHref>
            <button className="text-white hover:text-emerald-400 transition-all duration-300 text-lg font-semibold">
              Home
            </button>
          </Link>
          <Link href="/cart" passHref>
            <button className="text-white hover:text-emerald-400 transition-all duration-300 text-lg font-semibold">
              Cart
            </button>
          </Link>
          <Link href="/about" passHref>
            <button className="text-white hover:text-emerald-400 transition-all duration-300 text-lg font-semibold">
              About Us
            </button>
          </Link>
          <Link href="/contact" passHref>
            <button className="text-white hover:text-emerald-400 transition-all duration-300 text-lg font-semibold">
              Contact
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-white">
            <i className="fas fa-bars"></i> {/* Menu icon for mobile */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
