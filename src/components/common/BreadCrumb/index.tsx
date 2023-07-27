import Link from 'next/link';

interface BreadcrumbProps {
  links: { title: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
