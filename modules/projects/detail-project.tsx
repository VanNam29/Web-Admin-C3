import { FC } from "react";
import Link from "next/link";
import { MainLayout } from "../../components/layouts/layout";
import { Project } from "../../types/type";

interface PropsDetailProject {
  project?: Project;
}

export const DetailProject: FC<PropsDetailProject> = (props) => {
  const { project } = props;

  return (
    <>
      <MainLayout title="detail">
        {project ? (
          <div className="w-full h-full">
            <div className="mobile:w-5/6 mobile:p-2 mobile:mt-12 tablet:w-1/2 laptop:w-1/3 h-full bg-white text-center m-auto rounded-4 laptop:p-24 laptop:mt-42">
              <p className="mobile:text-18 tablet:text-24 laptop:text-28">
                Detail project
              </p>
              <div className="text-left pt-24 p-24 mobile:text-14 laptop:text-18">
                <p className="">
                  <strong>Name:</strong> {project.name}
                </p>
                <p className="mt-4">
                  <strong>Description: </strong>
                  {project.description}
                </p>
                <p className="mt-4">
                  <strong>Kind: </strong>
                  {project.kind}
                </p>
              </div>
              <div className="h-36 w-72 m-auto" role="button">
                <Link href="/projects">
                  <div className="h-full w-full bg-black text-white rounded-4 focus:outline-none p-4 pl-6">
                    Back
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </MainLayout>
    </>
  );
};
