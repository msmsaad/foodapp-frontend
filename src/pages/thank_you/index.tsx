import { Layout } from "@components/Layout/Layout";
import Image from "next/image";
import Link from "next/link";

const ThankYouPage = () => {
  return (
    <Layout title="Thank you">
      <div className="w-50 card lg:card-side bg-base-100 shadow-xl">
        <Image src="/images/tick.png" width={300} height={300} alt="tick" />
        <div className="card-body">
          <h2 className="card-title">Thank you for the purchase!</h2>
          <p>Browse more categories to find delious food</p>
          <div className="card-actions justify-end">
            <Link className="btn btn-primary" href={`/`}>
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
