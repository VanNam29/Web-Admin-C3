import { FC } from "react";
import { DetailProject } from "../../modules/projects/detail-project";
import { Project } from "../../types/type";

interface PropsProjectDetail {
  project: Project;
}

const ProjectDetail: FC<PropsProjectDetail> = (props) => {
  const { project } = props;

  return <DetailProject project={project} />;
};

export default ProjectDetail;

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3300/projects/${params.id}`);
  const project: Project = await res.json();

  return {
    props: {
      project,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3300/projects");
  const projects: Project[] = await res.json();
  const paths = projects.map((project: Project) => ({
    params: { id: project.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
