import { FC } from "react";
import { Category } from "../../types/type";
import Link from "next/link";
import { MainLayout } from "../../components/layouts/layout";

interface CategoryDetailProps {
  category?: Category;
}

export const CategoryDetail: FC<CategoryDetailProps> = (props) => {
  const { category } = props;
  console.log("Customer", category);

  return (
    <MainLayout title="detail">
      {category ? (
        <div className="w-full h-full">
          <div className="mobile:w-5/6 mobile:p-2 mobile:mt-12 tablet:w-1/2 laptop:w-1/3 h-full bg-white text-center m-auto rounded-4 laptop:p-24 laptop:mt-42">
            <p className="mobile:text-18 tablet:text-24 laptop:text-28">
              Detail category
            </p>
            <div className="text-left pt-24 p-24 mobile:text-14 laptop:text-18">
              <p className="">
                <strong>Name:</strong> {category.name}
              </p>
              <p className="mt-4">
                <strong>Description: </strong>
                {category.description}
              </p>
            </div>
            <div className="h-36 w-72 m-auto" role="button">
              <Link href="/categories">
                <div className="h-full w-full bg-black text-white rounded-4 focus:outline-none p-4 pl-6">
                  Back
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </MainLayout>
  );
};
