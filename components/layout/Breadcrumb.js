import Link from "next/link";

export default function Breadcrumb({ title = "", paths = [] }) {
return (
    <section className="page-header">
        <div className="container">
            <div className="page-header-content">
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {paths.map((item, index) => (
                        <li key={index}>
                            {item.href ? (
                                <Link href={item.href}>{item.name}</Link>
                            ) : (
                                <span>{item.name}</span>
                            )}
                        </li>
                    ))}
                    {title && (
                        <li className="active">
                            <span>{title}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </section>
);
}
