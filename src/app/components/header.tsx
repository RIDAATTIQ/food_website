import Link from "next/link";

const Header = () => {
    return (
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Zaiqa Express</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-yellow-500">Home</Link></li>
            <li><Link href="/menu" className="hover:text-yellow-500">Menu</Link></li>
            <li><Link href="/cart" className="hover:text-yellow-500">Cart</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-500">Contact</Link></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;