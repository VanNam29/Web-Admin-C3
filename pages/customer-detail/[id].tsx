import { FC } from "react";
import { DetailCustomer } from "../../modules/customers/customer-detail";
import { Customer } from "../../types/type";

interface CustomerDetailProps {
  customer?: Customer;
}

const CustomerDetail: FC<CustomerDetailProps> = (props) => {
  const { customer } = props;
  return <DetailCustomer customer={customer} />;
};

export default CustomerDetail;

// export const getServerSideProps = async ({ params }) => {
//   const res = await fetch(`http://localhost:3100/customers/${params.id}`);
//   const customer = await res.json();

//   return {
//     props: {
//       customer,
//     },
//   };
// };

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3100/customers/${params.id}`);
  const customer: Customer = await res.json();

  return {
    props: {
      customer,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3100/customers");
  const customers: Customer[] = await res.json();
  const paths = customers.map((customer: Customer) => ({
    params: { id: customer.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
