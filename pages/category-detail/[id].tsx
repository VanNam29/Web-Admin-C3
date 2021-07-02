import { FC } from "react";
import { CategoryDetail } from "../../modules/categories/category-detail";
import { Category } from "../../types/type";

interface DetailCategoryProps {
  category?: Category;
}

const DetailCategory: FC<DetailCategoryProps> = (props) => {
  const { category } = props;

  return <CategoryDetail category={category} />;
};

export default DetailCategory;

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3200/categories/${params.id}`);
  const category: Category = await res.json();
  console.log(category);

  return {
    props: {
      category,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3200/categories");
  const categories: Category[] = await res.json();
  const paths = categories.map((category: Category) => ({
    params: { id: category.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
