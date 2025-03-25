
import { Link } from 'react-router-dom';

interface BreadcrumbNavProps {
  productName: string;
}

const BreadcrumbNav = ({ productName }: BreadcrumbNavProps) => {
  return (
    <nav className="flex items-center text-sm mb-8">
      <Link to="/" className="text-gray-500 hover:text-black transition-colors">
        Home
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <Link to="/shop" className="text-gray-500 hover:text-black transition-colors">
        Shop
      </Link>
      <span className="mx-2 text-gray-400">/</span>
      <span className="text-gray-900">{productName}</span>
    </nav>
  );
};

export default BreadcrumbNav;
