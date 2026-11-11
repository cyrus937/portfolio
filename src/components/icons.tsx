import type { IconType } from "react-icons";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiAngular, SiDjango, SiDocker, SiFastapi, SiFlask, SiFlutter, SiGitlab, SiKeycloak, SiKubernetes,
  SiLinux, SiPandas, SiPostgresql, SiPython, SiPytorch, SiReact, SiRedis, SiRust, SiSpring,
  SiTensorflow, SiTypescript,
} from "react-icons/si";

export const techIcons: Record<string, IconType> = {
  Python: SiPython, Java: FaJava, Rust: SiRust, TypeScript: SiTypescript, FastAPI: SiFastapi,
  Spring: SiSpring, Django: SiDjango, Flask: SiFlask, PyTorch: SiPytorch, TensorFlow: SiTensorflow,
  Pandas: SiPandas, Kubernetes: SiKubernetes, Docker: SiDocker, AWS: FaAws, PostgreSQL: SiPostgresql,
  Redis: SiRedis, Keycloak: SiKeycloak, React: SiReact, Angular: SiAngular, Linux: SiLinux,
  GitLab: SiGitlab, Flutter: SiFlutter,
};
